---
layout: example.11ty.cjs
title: <gx-number-format> ⌲ Examples ⌲ Basic
tags: example
name: Basic
description: A basic example
---

<gx-number-format></gx-number-format>

<h3>CSS</h3>

```css
p {
  border: solid 1px blue;
  padding: 8px;
}
```

<h3>HTML</h3>

```html
<gx-number-format></gx-number-format>
```

### Examples
#### Prefix and thousand separator : Format currency as text
```html
<gx-number-format value="2456981" displayType="text" thousandSeparator="true" prefix="$"></gx-number-format>
```
Output : $2,456,981

#### Custom renderText method
```html
<gx-number-format value="2456981" className="foo" displayType="text" thousandSeparator="true" prefix="$" renderText="(value, props) => <div {...props}>{value}</div>}></gx-number-format>
```
Output : `<div class="foo"> $2,456,981 </div>`

#### Format with pattern : Format credit card as text
```html
<gx-number-format value="4111111111111111" displayType="text" format="#### #### #### ####"></gx-number-format>
```
Output : 4111 1111 1111 1111

#### Prefix and thousand separator : Format currency in input
```html
<gx-number-format thousandSeparator="true" prefix="$"></gx-number-format>
```
![Screencast example](https://i.imgur.com/d0P2Db1.gif)

#### Indian(lakh) style and chinese(wan) style number grouping
Indian (lakh) style grouping
```html
<gx-number-format thousandSeparator="true" thousandsGroupStyle="lakh" prefix="₹" value="123456789"></gx-number-format>
```
Output: ₹12,34,56,789

Chinese (wan) style grouping
```html
<gx-number-format thousandSeparator="true" thousandsGroupStyle="wan" prefix="¥" value="123456789"></gx-number-format>
```
Output: ¥1,2345,6789


#### Maintaining change value on state
```html
<gx-number-format value="this.state.profit" thousandSeparator="true" prefix="$" onValueChange="(values) => {
    const {formattedValue, value" = values;
    // formattedValue = $2,223
    // value ie, 2223
    this.setState({profit: formattedValue})
  }}/>
```

#### Format with pattern : Format credit card in an input
```html
<gx-number-format format="#### #### #### ####"></gx-number-format>
```
![Screencast example](https://i.imgur.com/KEiYp4o.gif)

#### Format with mask : Format credit card in an input
```html
<gx-number-format format="#### #### #### ####" mask="_"></gx-number-format>
```
![Screencast example](https://i.imgur.com/qvmydpH.gif)


#### Format with mask as array
Mask can also be a array of string. Each item corresponds to the same index #.
```html
<gx-number-format format="##/##" placeholder="MM/YY" mask="['M', 'M', 'Y', 'Y']"></gx-number-format>
```
![Screencast example](https://media.giphy.com/media/xT9IgojmLf6x3jX0nS/giphy.gif)

#### Custom format method  : Format credit card expiry time
```html
<script>
  function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = '0' + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = '01';

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }

  function cardExpiry(val) {
    let month = limit(val.substring(0, 2), '12');
    let year = val.substring(2, 4);

    return month + (year.length ? '/' + year : '');
  }
</script>

<gx-number-format format="cardExpiry"></gx-number-format>
```
![Screencast example](https://i.imgur.com/9wwdyFF.gif)

### Format phone number
```html
<gx-number-format format="+1 (###) ###-####" mask="_"></gx-number-format>
```
![Screencast example](https://media.giphy.com/media/l1J9wJ6ZSONO7cXkI/giphy.gif)

### Limit input value to a maximum limit
```html
    <script>
        const MAX_VAL = 1400;
        const withValueLimit = (inputObj) => {
          const { value } = inputObj;
          if (value < MAX_VAL) return inputObj;
        };
    </script>
  <gx-number-format value="12" isAllowed="withValueLimit"></gx-number-format>;
```

Visit this link for Demo: [Field with value limit](https://codesandbox.io/s/react-number-format-isallowed-8gu0v)

![Screencast example](https://media.giphy.com/media/7agdv1sb9JYJEYlN3s/giphy.gif)

### Show mask on empty input
```html
<gx-number-format format="+1 (###) ###-####" allowEmptyFormatting mask="_"></gx-number-format>
```
![Screencast example](https://media.giphy.com/media/jnavoo7mbNeQ7LJCHI/source.gif)
