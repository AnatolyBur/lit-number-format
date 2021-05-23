/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  LitElement,
  html,
  css
} from 'lit';
import {
  customElement,
  property,
  state
} from 'lit/decorators.js';

import {
  charIsNumber,
  escapeRegExp,
  fixLeadingZero,
  limitToScale,
  roundToPrecision,
  setCaretPosition,
  splitDecimal,
  findChangedIndex,
  clamp,
  applyThousandSeparator,
  getCurrentCaretPosition,
  addInputMode,
  isNil,
  toNumericString,
  returnTrue,
} from './utils';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('gx-number-format')
export class GxNumberFormat extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
  `;
  //
  @property()
  decimalScale: number | undefined;

  @property()
  format: string | Function = '';

  @property()
  decimalSeparator: string = '.';

  @property()
  thousandSeparator: string | boolean = true;

  @property()
  allowedDecimalSeparators: Array<string> = [];

  @property()
  mask: string | Array<string> | undefined;

  @property()
  suffix: string = '';

  @property()
  prefix: string = '';

  @property()
  fixedDecimalScale: boolean = false;

  @property()
  allowNegative: boolean = true;

  @property()
  thousandsGroupStyle: 'text' | 'tel' | 'password' | 'thousand' = 'thousand';

  @property()
  allowEmptyFormatting: boolean = false;

  @state()
  value: string | number = '';

  @state()
  numAsString: string = '';

  @state()
  mounted: boolean = false;

  @property()
  isNumericString: boolean = false;

  @property()
  isAllowed: Function = returnTrue;

  @property()
  focusTimeout: null | ReturnType<typeof setTimeout> = null;

  @property()
  allowLeadingZeros: boolean = false;

  @property()
  type: 'text' | 'tel' | 'password' = 'text';

  @property()
  focusedElm?: HTMLElement | undefined | null;

  selectionBeforeInput: {
    selectionStart: number,
    selectionEnd: number,
  } = {
    selectionStart: 0,
    selectionEnd: 0,
  };

  getFormatString() {
    if(typeof this.format === 'string') {
      return this.format;
    }
    return '';
  }

  // connectedCallback() {
    // this.mounted = true;
  // }
  //
  /** Misc methods **/
  getFloatString(num: string = '') {
    const { decimalScale } = this;
    const { decimalSeparator } = this.getSeparators();
    const numRegex = this.getNumberRegex(true);

    //remove negation for regex check
    const hasNegation = num[0] === '-';
    if (hasNegation) num = num.replace('-', '');

    //if decimal scale is zero remove decimal and number after decimalSeparator
    if (decimalSeparator && decimalScale === 0) {
      num = num.split(decimalSeparator)[0];
    }

    num = (num.match(numRegex) || []).join('').replace(decimalSeparator, '.');

    //remove extra decimals
    const firstDecimalIndex = num.indexOf('.');

    if (firstDecimalIndex !== -1) {
      num = `${num.substring(0, firstDecimalIndex)}.${num
        .substring(firstDecimalIndex + 1, num.length)
        .replace(new RegExp(escapeRegExp(decimalSeparator), 'g'), '')}`;
    }

    //add negation back
    if (hasNegation) num = '-' + num;

    return num;
  }

  //returned regex assumes decimalSeparator is as per prop
  getNumberRegex(g: boolean, ignoreDecimalSeparator?: boolean) {
    const { format, decimalScale } = this;
    const { decimalSeparator } = this.getSeparators();
    return new RegExp(
      '\\d' +
        (decimalSeparator && decimalScale !== 0 && !ignoreDecimalSeparator && !format
          ? '|' + escapeRegExp(decimalSeparator)
          : ''),
      g ? 'g' : undefined,
    );
  }

  getSeparators() {
    const { decimalSeparator } = this;
    let { thousandSeparator, allowedDecimalSeparators } = this;

    if (thousandSeparator === true) {
      thousandSeparator = ',';
    }
    if (!allowedDecimalSeparators) {
      allowedDecimalSeparators = [decimalSeparator, '.'];
    }

    return {
      decimalSeparator,
      thousandSeparator,
      allowedDecimalSeparators,
    };
  }

  getMaskAtIndex(index: number) {
    const { mask = ' ' } = this;
    if (typeof mask === 'string') {
      return mask;
    }

    return mask[index] || ' ';
  }

  getValueObject(formattedValue: string, numAsString: string) {
    const floatValue = parseFloat(numAsString);

    return {
      formattedValue,
      value: numAsString,
      floatValue: isNaN(floatValue) ? undefined : floatValue,
    };
  }

  /** caret specific methods **/
  setPatchedCaretPosition(el: HTMLInputElement, caretPos: number, currentValue: string) {
    /* setting caret position within timeout of 0ms is required for mobile chrome,
    otherwise browser resets the caret position after we set it
    We are also setting it without timeout so that in normal browser we don't see the flickering */
    setCaretPosition(el, caretPos);
    setTimeout(() => {
      if (el.value === currentValue) setCaretPosition(el, caretPos);
    }, 0);
  }

  /* This keeps the caret within typing area so people can't type in between prefix or suffix */
  correctCaretPosition(value: string, caretPos: number, direction?: string) {
    const { prefix, suffix, format } = this;

    //if value is empty return 0
    if (value === '') return 0;

    //caret position should be between 0 and value length
    caretPos = clamp(caretPos, 0, value.length);

    //in case of format as number limit between prefix and suffix
    if (!format) {
      const hasNegation = value[0] === '-';
      return clamp(caretPos, prefix.length + (hasNegation ? 1 : 0), value.length - suffix.length);
    }

    //in case if custom format method don't do anything
    if (typeof format === 'function') return caretPos;

    /* in case format is string find the closest # position from the caret position */

    //in case the caretPos have input value on it don't do anything
    if (format[caretPos] === '#' && charIsNumber(value[caretPos])) {
      return caretPos;
    }

    //if caretPos is just after input value don't do anything
    if (format[caretPos - 1] === '#' && charIsNumber(value[caretPos - 1])) {
      return caretPos;
    }

    //find the nearest caret position
    const firstHashPosition = format.indexOf('#');
    const lastHashPosition = format.lastIndexOf('#');

    //limit the cursor between the first # position and the last # position
    caretPos = clamp(caretPos, firstHashPosition, lastHashPosition + 1);

    const nextPos = format.substring(caretPos, format.length).indexOf('#');
    let caretLeftBound = caretPos;
    const caretRightBound = caretPos + (nextPos === -1 ? 0 : nextPos);

    //get the position where the last number is present
    while (
      caretLeftBound > firstHashPosition &&
      (format[caretLeftBound] !== '#' || !charIsNumber(value[caretLeftBound]))
    ) {
      caretLeftBound -= 1;
    }

    const goToLeft =
      !charIsNumber(value[caretRightBound]) ||
      (direction === 'left' && caretPos !== firstHashPosition) ||
      caretPos - caretLeftBound < caretRightBound - caretPos;

    if (goToLeft) {
      //check if number should be taken after the bound or after it
      //if number preceding a valid number keep it after
      return charIsNumber(value[caretLeftBound]) ? caretLeftBound + 1 : caretLeftBound;
    }

    return caretRightBound;
  }

  getCaretPosition(inputValue: string, formattedValue: string, caretPos: number) {
    const { format } = this;
    const stateValue = this.value;
    const numRegex = this.getNumberRegex(true);
    const inputNumber = (inputValue.match(numRegex) || []).join('');
    const formattedNumber = (formattedValue.match(numRegex) || []).join('');
    let j, i;

    j = 0;

    for (i = 0; i < caretPos; i++) {
      const currentInputChar = inputValue[i] || '';
      const currentFormatChar = formattedValue[j] || '';
      //no need to increase new cursor position if formatted value does not have those characters
      //case inputValue = 1a23 and formattedValue =  123
      if (!currentInputChar.match(numRegex) && currentInputChar !== currentFormatChar) {
        continue;
      }

      //When we are striping out leading zeros maintain the new cursor position
      //Case inputValue = 00023 and formattedValue = 23;
      if (
        currentInputChar === '0' &&
        currentFormatChar.match(numRegex) &&
        currentFormatChar !== '0' &&
        inputNumber.length !== formattedNumber.length
      ) {
        continue;
      }

      //we are not using currentFormatChar because j can change here
      while (currentInputChar !== formattedValue[j] && j < formattedValue.length) {
        j++;
      }
      j++;
    }

    if (typeof format === 'string' && !stateValue) {
      //set it to the maximum value so it goes after the last number
      j = formattedValue.length;
    }

    //correct caret position if its outside of editable area
    j = this.correctCaretPosition(formattedValue, j);

    return j;
  }
  /** caret specific methods ends **/

  /** methods to remove formattting **/
  removePrefixAndSuffix(val: string) {
    const { format, prefix, suffix } = this;

    //remove prefix and suffix
    if (!format && val) {
      const isNegative = val[0] === '-';

      //remove negation sign
      if (isNegative) val = val.substring(1, val.length);

      //remove prefix
      val = prefix && val.indexOf(prefix) === 0 ? val.substring(prefix.length, val.length) : val;

      //remove suffix
      const suffixLastIndex = val.lastIndexOf(suffix);
      val =
        suffix && suffixLastIndex !== -1 && suffixLastIndex === val.length - suffix.length
          ? val.substring(0, suffixLastIndex)
          : val;

      //add negation sign back
      if (isNegative) val = '-' + val;
    }

    return val;
  }

  removePatternFormatting(val: string) {
    const format = this.getFormatString()
    const formatArray = format.split('#').filter((str) => str !== '');
    let start = 0;
    let numStr = '';

    for (let i = 0, ln = formatArray.length; i <= ln; i++) {
      const part = formatArray[i] || '';

      //if i is the last fragment take the index of end of the value
      //For case like +1 (911) 911 91 91 having pattern +1 (###) ### ## ##
      const index = i === ln ? val.length : val.indexOf(part, start);

      /* in any case if we don't find the pattern part in the value assume the val as numeric string
      This will be also in case if user has started typing, in any other case it will not be -1
      unless wrong prop value is provided */
      if (index === -1) {
        numStr = val;
        break;
      } else {
        numStr += val.substring(start, index);
        start = index + part.length;
      }
    }

    return (numStr.match(/\d/g) || []).join('');
  }

  removeFormatting(val: string) {
    const { format, removeFormatting } = this;
    if (!val) return val;

    if (!format) {
      val = this.removePrefixAndSuffix(val);
      val = this.getFloatString(val);
    } else if (typeof format === 'string') {
      val = this.removePatternFormatting(val);
    } else if (typeof removeFormatting === 'function') {
      //condition need to be handled if format method is provide,
      val = removeFormatting(val);
    } else {
      val = (val.match(/\d/g) || []).join('');
    }
    return val;
  }
  /** methods to remove formattting end **/

  /*** format specific methods start ***/
  /**
   * Format when # based string is provided
   * @param  {string} numStr Numeric String
   * @return {string}        formatted Value
   */
  formatWithPattern(numStr: string) {
    const format = this.getFormatString();
    let hashCount = 0;
    const formattedNumberAry = format.split('');
    for (let i = 0, ln = format.length; i < ln; i++) {
      if (format[i] === '#') {
        formattedNumberAry[i] = numStr[hashCount] || this.getMaskAtIndex(hashCount);
        hashCount += 1;
      }
    }
    return formattedNumberAry.join('');
  }
  /**
   * @param  {string} numStr Numeric string/floatString] It always have decimalSeparator as .
   * @return {string} formatted Value
   */
  formatAsNumber(numStr: string) {
    const {
      decimalScale,
      fixedDecimalScale,
      prefix,
      suffix,
      allowNegative,
      thousandsGroupStyle,
    } = this;
    const { thousandSeparator, decimalSeparator } = this.getSeparators();

    const hasDecimalSeparator = numStr.indexOf('.') !== -1 || (decimalScale && fixedDecimalScale);
    let { beforeDecimal, afterDecimal, addNegation } = splitDecimal(numStr, allowNegative); // eslint-disable-line prefer-const

    //apply decimal precision if its defined
    if (decimalScale !== undefined) {
      afterDecimal = limitToScale(afterDecimal, decimalScale, fixedDecimalScale);
    }

    if (thousandSeparator) {
      beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle);
    }

    //add prefix and suffix
    if (prefix) beforeDecimal = prefix + beforeDecimal;
    if (suffix) afterDecimal = afterDecimal + suffix;

    //restore negation sign
    if (addNegation) beforeDecimal = '-' + beforeDecimal;

    numStr = beforeDecimal + ((hasDecimalSeparator && decimalSeparator) || '') + afterDecimal;

    return numStr;
  }

  formatNumString(numStr: string = '') {
    const { format, allowEmptyFormatting } = this;
    let formattedValue = numStr;

    if (numStr === '' && !allowEmptyFormatting) {
      formattedValue = '';
    } else if (numStr === '-' && !format) {
      formattedValue = '-';
    } else if (typeof format === 'string') {
      formattedValue = this.formatWithPattern(formattedValue);
    } else if (typeof format === 'function') {
      formattedValue = format(formattedValue);
    } else {
      formattedValue = this.formatAsNumber(formattedValue);
    }

    return formattedValue;
  }

  formatValueProp(defaultValue: string | number) {
    const { format, decimalScale, fixedDecimalScale, allowEmptyFormatting } = this;
    let { value, isNumericString } = this;

    // if value is undefined or null, use defaultValue instead
    value = isNil(value) ? defaultValue : value;

    const isNonNumericFalsy = !value && Number(value) !== 0;

    if (isNonNumericFalsy && allowEmptyFormatting) {
      value = '';
    }

    // if value is not defined return empty string
    if (isNonNumericFalsy && !allowEmptyFormatting) return '';

    if (typeof value === 'number') {
      value = toNumericString(value);
      isNumericString = true;
    }

    //change infinity value to empty string
    if (value === 'Infinity' && isNumericString) {
      value = '';
    }

    //round the number based on decimalScale
    //format only if non formatted value is provided
    if (isNumericString && !format && typeof decimalScale === 'number') {
      value = roundToPrecision(value, decimalScale, fixedDecimalScale);
    }

    const formattedValue = isNumericString ? this.formatNumString(value) : this.formatInput(value);

    return formattedValue;
  }

  formatNegation(value: string = '') {
    const { allowNegative } = this;
    const negationRegex = new RegExp('(-)');
    const doubleNegationRegex = new RegExp('(-)(.)*(-)');

    // Check number has '-' value
    const hasNegation = negationRegex.test(value);

    // Check number has 2 or more '-' values
    const removeNegation = doubleNegationRegex.test(value);

    //remove negation
    value = value.replace(/-/g, '');

    if (hasNegation && !removeNegation && allowNegative) {
      value = '-' + value;
    }

    return value;
  }

  formatInput(value: string = '') {
    const { format } = this;

    //format negation only if we are formatting as number
    if (!format) {
      value = this.removePrefixAndSuffix(value);
      value = this.formatNegation(value);
    }

    //remove formatting from number
    value = this.removeFormatting(value);
    return this.formatNumString(value);
  }

  /*** format specific methods end ***/
  isCharacterAFormat(caretPos: number, value: string) {
    const { format, prefix, suffix, decimalScale, fixedDecimalScale } = this;
    const { decimalSeparator } = this.getSeparators();

    //check within format pattern
    if (typeof format === 'string' && format[caretPos] !== '#') return true;

    //check in number format
    if (
      !format &&
      (caretPos < prefix.length ||
        caretPos >= value.length - suffix.length ||
        (decimalScale && fixedDecimalScale && value[caretPos] === decimalSeparator))
    ) {
      return true;
    }

    return false;
  }

  checkIfFormatGotDeleted(start: number, end: number, value: string) {
    for (let i = start; i < end; i++) {
      if (this.isCharacterAFormat(i, value)) return true;
    }
    return false;
  }

  /**
   * This will check if any formatting got removed by the delete or backspace and reset the value
   * It will also work as fallback if android chrome keyDown handler does not work
   **/
  correctInputValue(caretPos: number, lastValue: string, value: string) {
    const { format, allowNegative, prefix, suffix, decimalScale } = this;
    const { allowedDecimalSeparators, decimalSeparator } = this.getSeparators();
    const lastNumStr = this.numAsString || '';
    const { selectionStart, selectionEnd } = this.selectionBeforeInput;
    const { start, end } = findChangedIndex(lastValue, value);

    /** Check for any allowed decimal separator is added in the numeric format and replace it with decimal separator */
    if (
      !format &&
      start === end &&
      allowedDecimalSeparators.indexOf(value[selectionStart]) !== -1
    ) {
      const separator = decimalScale === 0 ? '' : decimalSeparator;
      return (
        value.substr(0, selectionStart) + separator + value.substr(selectionStart + 1, value.length)
      );
    }

    const leftBound = !!format ? 0 : prefix.length;
    const rightBound = lastValue.length - (!!format ? 0 : suffix.length);

    if (
      // don't do anything if something got added
      value.length > lastValue.length ||
      // or if the new value is an empty string
      !value.length ||
      // or if nothing has changed, in which case start will be same as end
      start === end ||
      // or in case if whole input is selected and new value is typed
      (selectionStart === 0 && selectionEnd === lastValue.length) ||
      // or in case if the whole content is replaced by browser, example (autocomplete)
      (start === 0 && end === lastValue.length) ||
      // or if charcters between prefix and suffix is selected.
      // For numeric inputs we apply the format so, prefix and suffix can be ignored
      (selectionStart === leftBound && selectionEnd === rightBound)
    ) {
      return value;
    }

    //if format got deleted reset the value to last value
    if (this.checkIfFormatGotDeleted(start, end, lastValue)) {
      value = lastValue;
    }

    //for numbers check if beforeDecimal got deleted and there is nothing after decimal,
    //clear all numbers in such case while keeping the - sign
    if (!format) {
      const numericString = this.removeFormatting(value);
      const { beforeDecimal, afterDecimal, addNegation } = splitDecimal(
        numericString,
        allowNegative,
      ); // eslint-disable-line prefer-const

      //clear only if something got deleted
      const isBeforeDecimalPoint = caretPos < value.indexOf(decimalSeparator) + 1;
      if (
        numericString.length < lastNumStr.length &&
        isBeforeDecimalPoint &&
        beforeDecimal === '' &&
        !parseFloat(afterDecimal)
      ) {
        return addNegation ? '-' : '';
      }
    }

    return value;
  }

  /** Update value and caret position */
  updateValue(params: {
    formattedValue: string,
    numAsString?: string,
    inputValue?: string,
    input: HTMLInputElement,
    caretPos?: number,
    setCaretPosition?: Boolean,
  }) {
    const { formattedValue, input, setCaretPosition = true } = params;
    let { numAsString, caretPos } = params;
    const lastValue = this.value;

    if (input) {
      //set caret position, and value imperatively when element is provided
      if (setCaretPosition) {
        //calculate caret position if not defined
        if (!caretPos) {
          const inputValue = params.inputValue || input.value;

          const currentCaretPosition = getCurrentCaretPosition(input);

          /**
           * set the value imperatively, this is required for IE fix
           * This is also required as if new caret position is beyond the previous value.
           * Caret position will not be set correctly
           */
          input.value = String(formattedValue);

          //get the caret position
          caretPos = this.getCaretPosition(inputValue, formattedValue, currentCaretPosition);
        }

        //set caret position
        this.setPatchedCaretPosition(input, caretPos, formattedValue);
      } else {
        /**
         * if we are not setting caret position set the value imperatively.
         * This is required on onBlur method
         */
        input.value = String(formattedValue);
      }
    }

    //calculate numeric string if not passed
    if (numAsString === undefined) {
      numAsString = this.removeFormatting(formattedValue);
    }

    //update state if value is changed
    if (formattedValue !== lastValue) {
      this.value = String(formattedValue);
      this.numAsString = numAsString;

      // trigger onValueChange synchronously, so parent is updated along with the number format. Fix for #277, #287
      const event = new CustomEvent('onValueChange', {
        detail: this.getValueObject(formattedValue, numAsString)
      });
      this.dispatchEvent(event);
      // onValueChange(this.getValueObject(formattedValue, numAsString));
    }
  }

  onChange(e: any) {
    const el = e.target;
    let inputValue = el.value;
    const { isAllowed } = this;
    const lastValue = this.value || '';


    const currentCaretPosition = getCurrentCaretPosition(el);

    inputValue = this.correctInputValue(currentCaretPosition, String(lastValue), inputValue);

    let formattedValue = this.formatInput(inputValue) || '';
    const numAsString = this.removeFormatting(formattedValue);

    const valueObj = this.getValueObject(formattedValue, numAsString);
    const isChangeAllowed = isAllowed(valueObj);

    if (!isChangeAllowed) {
      formattedValue = String(lastValue);
    }

    this.updateValue({ formattedValue, numAsString, inputValue, input: el });

    if (isChangeAllowed) {
      const event = new CustomEvent('onChange', {
        detail: e
      });
      this.dispatchEvent(event);
    }
  }

  onBlur = (e: any) => {
    const {
      format,
      // onBlur,
      allowLeadingZeros
    } = this;
    let { numAsString } = this;
    const lastValue = this.value;
    this.focusedElm = null;

    if(this.focusTimeout) {
      clearTimeout(this.focusTimeout);
    }

    if (!format) {
      // if the numAsString is not a valid number reset it to empty
      if (isNaN(parseFloat(numAsString))) {
        numAsString = '';
      }

      if (!allowLeadingZeros) {
        numAsString = fixLeadingZero(numAsString);
      }

      const formattedValue = this.formatNumString(numAsString);

      //change the state
      if (formattedValue !== lastValue) {
        // the event needs to be persisted because its properties can be accessed in an asynchronous way
        this.updateValue({
          formattedValue,
          numAsString,
          input: e.target,
          setCaretPosition: false,
        });
        // onBlur(e);
        return;
      }
    }
    // onBlur(e);
  }

  onKeyDown(e: any) {
    const el = e.target;
    const { key } = e;
    const { selectionStart, selectionEnd, value = '' } = el;
    let expectedCaretPosition;
    const { decimalScale, fixedDecimalScale, prefix, suffix, onKeyDown } = this;
    const format = this.getFormatString();
    const ignoreDecimalSeparator = decimalScale !== undefined && fixedDecimalScale;
    const numRegex = this.getNumberRegex(false, ignoreDecimalSeparator);
    const negativeRegex = new RegExp('-');
    const isPatternFormat = typeof format === 'string';

    this.selectionBeforeInput = {
      selectionStart,
      selectionEnd,
    };

    //Handle backspace and delete against non numerical/decimal characters or arrow keys
    if (key === 'ArrowLeft' || key === 'Backspace') {
      expectedCaretPosition = selectionStart - 1;
    } else if (key === 'ArrowRight') {
      expectedCaretPosition = selectionStart + 1;
    } else if (key === 'Delete') {
      expectedCaretPosition = selectionStart;
    }

    //if expectedCaretPosition is not set it means we don't want to Handle keyDown
    //also if multiple characters are selected don't handle
    if (expectedCaretPosition === undefined || selectionStart !== selectionEnd) {
      onKeyDown(e);
      return;
    }

    let newCaretPosition = expectedCaretPosition;
    const leftBound = isPatternFormat ? format.indexOf('#') : prefix.length;
    const rightBound = isPatternFormat ? format.lastIndexOf('#') + 1 : value.length - suffix.length;

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      const direction = key === 'ArrowLeft' ? 'left' : 'right';
      newCaretPosition = this.correctCaretPosition(value, expectedCaretPosition, direction);
    } else if (
      key === 'Delete' &&
      !numRegex.test(value[expectedCaretPosition]) &&
      !negativeRegex.test(value[expectedCaretPosition])
    ) {
      while (!numRegex.test(value[newCaretPosition]) && newCaretPosition < rightBound) {
        newCaretPosition++;
      }
    } else if (key === 'Backspace' && !numRegex.test(value[expectedCaretPosition])) {
      /* NOTE: This is special case when backspace is pressed on a
      negative value while the cursor position is after prefix. We can't handle it on onChange because
      we will not have any information of keyPress
      */
      if (selectionStart <= leftBound + 1 && value[0] === '-' && typeof format === 'undefined') {
        const newValue = value.substring(1);
        this.updateValue({
          formattedValue: newValue,
          caretPos: newCaretPosition,
          input: el,
        });
      } else if (!negativeRegex.test(value[expectedCaretPosition])) {
        while (!numRegex.test(value[newCaretPosition - 1]) && newCaretPosition > leftBound) {
          newCaretPosition--;
        }
        newCaretPosition = this.correctCaretPosition(value, newCaretPosition, 'left');
      }
    }

    if (
      newCaretPosition !== expectedCaretPosition ||
      expectedCaretPosition < leftBound ||
      expectedCaretPosition > rightBound
    ) {
      e.preventDefault();
      this.setPatchedCaretPosition(el, newCaretPosition, value);
    }

    /* NOTE: this is just required for unit test as we need to get the newCaretPosition,
            Remove this when you find different solution */
    if (e.isUnitTestRun) {
      this.setPatchedCaretPosition(el, newCaretPosition, value);
    }

    onKeyDown(e);
  }

  /** required to handle the caret position when click anywhere within the input **/
  onMouseUp(e: any) {
    const el = e.target;

    /**
     * NOTE: we have to give default value for value as in case when custom input is provided
     * value can come as undefined when nothing is provided on value prop.
     */
    const { selectionStart, selectionEnd, value = '' } = el;

    if (selectionStart === selectionEnd) {
      const caretPosition = this.correctCaretPosition(value, selectionStart);
      if (caretPosition !== selectionStart) {
        this.setPatchedCaretPosition(el, caretPosition, value);
      }
    }

    // this.props.onMouseUp(e);

    const event = new CustomEvent('onMouseUp', {
      detail: e
    });
    this.dispatchEvent(event);
  }

  onFocus(e: any) {
    // Workaround Chrome and Safari bug https://bugs.chromium.org/p/chromium/issues/detail?id=779328
    // (onFocus event target selectionStart is always 0 before setTimeout)
    if(e.persist) {
      e.persist();
    }

    this.focusedElm = e.target;
    this.focusTimeout = setTimeout(() => {
      const el = e.target;
      const { selectionStart, selectionEnd, value = '' } = el;

      const caretPosition = this.correctCaretPosition(value, selectionStart);

      //setPatchedCaretPosition only when everything is not selected on focus (while tabbing into the field)
      if (
        caretPosition !== selectionStart &&
        !(selectionStart === 0 && selectionEnd === value.length)
      ) {
        this.setPatchedCaretPosition(el, caretPosition, value);
      }

      const event = new CustomEvent('onFocus', {
        detail: e
      });
      this.dispatchEvent(event);
    }, 0);
  }

  render() {

    const {
      type,
      // displayType,
      // customInput,
      // renderText,
      // getInputRef,
      // format
    } = this;
    const format = this.getFormatString();
    const {
      value,
      mounted
    } = this;

    // add input mode on element based on format prop and device once the component is mounted
    const inputMode = mounted && addInputMode(format) ? 'numeric' : undefined;

    return html`
      <input
        part="input"
        @change="${this.onChange}"
        @input="${this.onChange}"
        @keyDown="${this.onKeyDown}"
        @mouseUp="${this.onMouseUp}"
        @focus="${this.onFocus}"
        @blur="${this.onBlur}"
        .value="${value}"
        .type="${type}"
        .inputmode="${inputMode}"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gx-number-format': GxNumberFormat;
  }
}
