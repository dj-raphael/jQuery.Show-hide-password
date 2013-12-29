jQuery.Show-hide-password
=========================
The simple jQuery plugin for display password as plain text, supported cancelable events

### Usage
#### Simple
<pre>
$('#password').showHidePassword()
</pre>

#### For invisible fields you can set size manualy
<pre>
$('#password').showHidePassword({size:22})
</pre>

#### For two fields with the "Confirm password" field, you can specify a second field
<pre>
$('#password').showHidePassword({retypeInput: '#password2' });
$('#password').showHidePassword({retypeInput: $('#password2') });
$('#password').showHidePassword({retypeInput: $('#password2')[0] });
</pre>

#### If you want to cancel the user action, you can add an event handler
<pre>
function passwordCallback(e) {
  return window.confirm("Are you shure to show password?");
}
$('#password').showHidePassword({ onShow: passwordCallback });
</pre>
### Options
<table>
<tr><th>Name</th><th>Description</th></tr>
<tr><td>size</td><td>default "size" is set to the height of input, but if the input is hidden height must be set manually</td></tr>
<tr><td>retypeInput</td><td>the second field is switched synchronously with the first. You can specify a string id, DOM element or jQuery element</td></tr>
<tr><td>onShow</td><td>event handler, called when input switched to show. Cancelable</td></tr>
<tr><td>onHide</td><td>event handler, called when input switched to hide. Cancelable</td></tr>
<tr><td>onToggle</td><td>event handler, called when input any switched. Cancelable</td></tr>
</table>
