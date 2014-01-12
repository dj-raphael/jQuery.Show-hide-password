/*
 * jQuery Show Hide Password Plugin
 * https://github.com/djraphael/jQuery.Show-hide-password 
 *
 * Copyright (c) 2014 Alexey Dzheksenov 
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 1.0
 *
 * Example usage:
 * $('#password').showHidePassword({ size: 22, retypeInput: '#password2', onShow: passwordCallback });
 */
(function($) {
    "use strict";
    if (!$) throw "jQuery required";
    var style = $('<style>'
    +'.view-password {user-select: none;display: block;width: 32px;height: 32px;cursor: pointer;position: absolute; right: 0; top: 0; margin-left: -32px; background-repeat: no-repeat}'
    +'.image-eye-closed {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERTRGRUZCNTM5ODYxMUUzOTM0M0I3QjI1RkQwRTRFQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERTRGRUZCNjM5ODYxMUUzOTM0M0I3QjI1RkQwRTRFQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRFNEZFRkIzMzk4NjExRTM5MzQzQjdCMjVGRDBFNEVDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRFNEZFRkI0Mzk4NjExRTM5MzQzQjdCMjVGRDBFNEVDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Fz9LmQAABHlJREFUeNq8V01sG0UUnl3v2ontON7G+C9pkrqJHTscIFXixr8JdVDFhZJLywWBqDj0ShSpKhIq4oYqhDghIVEVVBWJQw4cKuDSC0IoBy7QRERRKxw5dhyXNCFV7cTL95zZdu062AlxR3qy55vZ+d68+fa9WWFmZobNz8+zcrnMFMXOQqEhaXHxz91C4YH6PDAWjUYZNYPBIEajYx0+X5/MeAMmtBoTBUFgkiSJk5OxrvX1grq8fL9EA0aj0QDMCazcKkyWJcbOnXtdGB8f7RgaGrBqXtHkVCrpAWZrISYmk1ETu3x5VkJIjE0u0KFhZnMbm5qasADTIGYyGYVmHTpzJmn3+0/KbHr6DaEJcjcwA4dcoiic9XrdV5zOrmvofwB7W5IMp+Lx093B4CBrZjOBAI94IpFoNNkOrA3dV2C3YHnoVcVvlUFgKrR0F/+vwLzt7SaWSk04G0WDxWKxiggx4Ko9I2BmYGF05zQiURRVCLeKvA622t3tuer3+zr/i3xfEeIsGRRrwyKz6G4ckFyP3YEF9qLRpAiJPJGIKA7HsS/1i9KCtUT7WW00gsHAdCg0KDYUIZEnkxHFbrfdbIaoGaNowLbx/7WGIkTYrU6n4/OjIq+xTVmWIxCmdR8RTrT19/dcbBF5xRDhdG9vd69ehIaRkZeFzk6rnMvlji8t3fsG+BMxHmWjlL+7W7ZtbDw8Rm8VIi5EImMmEQIxZLO54sLCEinexVrUVFWtGNpbOIpYPD4uZzKrZRIhgX2w7VaGX28ul+NbZMyK+KV8fp1+KWG0Q616T1vSiGNtrWDOZvMVEpEuCRDh7yguvz4PcmrgnNNEKDocXUI4PIKbivKh2kp2rgOQ/4G/N/dEGN4TYSaTFVdWMrcxcI1nslY5QDq7BPJHEGGnJkJB96p4UdU2mk25h7AbvC64n8mE0IEZr8cPR0leZ60CIn4BdUF+JhMi/1/XPUC14Eeq8Yd1SFcRi3y9Aq8Lf1OFrCrH4fCpNqNR/o0//D2FKRTyRzC52Kj01nOQE2n97ywWM0Ple0c3NwUdMCrHFRGureUfF4ul8xh4FwNvhsNjHel0ZhaKpVDtwNbr5QjCagWrzcOzmxyaBHkSV7avgL+K/gVw3KkrQvIKRcns8/Wf13aDyFxHhPowNtfkReQhL72nKfyEgfynao6nIhSRCVWtHCcS4550Ol1cXr73mL8V2dHRkU+3tv65XyqVNvkOVz0e92cYW+DReAQnbyiK7TaPEF1u7qLy/eJyvfAFYTs7u3I1x8r24uLSVqM7YQpfMQlglL7csAe0S5B/PTwcJOeucg38hUXtiNowFxxdTj+iSA4M+BT0p+j5A90J+YXUhoJh4lBIC7HVajnLsU84Wa6nx+vm2M+Eeb2eWxCxXBP2//VhIuHMLoHsoi5pvc/VTldxme/oxRMnjn8MBwYP+2EiYkDBZEsNZseOnige5yvGYmG6+7+H7ku6eWaa18R6CjZkrgDxeJyfh1x5LwOBk8anZ7Q/Rl9KmkMHfVaP/SvAABI70gRKIq7EAAAAAElFTkSuQmCC);}'
    +'.image-eye-open {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRDMzMUU1NzM5ODcxMUUzQTU5MkM3RTQ3ODhDQURGQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRDMzMUU1ODM5ODcxMUUzQTU5MkM3RTQ3ODhDQURGQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBEMzMxRTU1Mzk4NzExRTNBNTkyQzdFNDc4OENBREZBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBEMzMxRTU2Mzk4NzExRTNBNTkyQzdFNDc4OENBREZBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VG6BaQAABhJJREFUeNq8V2tsFFUU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);}'
    +'</style>');
    $('html > head').append(style);

    var defaultOptions = {
        size: null,
        retypeInput: null,
        onToggle: function () { return true; },
        onShow: function() { return true; },
        onHide: function() { return true; }
    };

    $.fn.showHidePassword = function(command, options) {
        if (typeof(command) == "object" || command === undefined) {
            options = command;
            command = 'create';
        }
        var data = this.data("showHidePassword");
        switch (command) {
        case 'create':
            if (data) data.destroy();
            var op = {};
            $.extend(op, defaultOptions);
            $.extend(op, options);
            var shp = new ShowHidePassword(this, op);
            this.data("showHidePassword", shp);
            break;
        case 'show':
            data.show();
            break;
        case 'hide':
            data.hide();
            break;
        case 'toggle':
            data.toggle();
            break;
        case 'destroy':
            data.destroy();
            break;
        default:
            throw "unknown command";
        }
        return this;
    };

    function ShowHidePassword(el, op) {
        this.$element = el;
        this.options = op;
        this.isShow = false;
        this.retypeInput = $(op.retypeInput);
        if (this.retypeInput.length == 0) {
            this.retypeInput = null;
        }
        if (typeof(op.onToggle) != "function") {
            op.onToggle = defaultOptions.onToggle;
        }
        if (typeof(op.onShow) != "function") {
            op.onShow = defaultOptions.onShow;
        }
        if (typeof(op.onHide) != "function") {
            op.onHide = defaultOptions.onHide;
        }
        if (!this.options.size) {
            this.options.size = this.$element.outerHeight(false);
        }

        this.init();
    }

    ShowHidePassword.prototype = {
        init: function() {
            this.$element.wrap("<span></span>");
            this.$wrapper = this.$element.parent();
            this.$wrapper.css({ position: 'relative' });
            this.$icon = $('<span class="view-password image-eye-closed"></span>')
                .css({ backgroundSize: this.options.size + 'px', width: this.options.size + 'px', height: this.options.size + 'px', marginRight: '2px' })
                .click(this.onclick.bind(this))
                .insertBefore(this.$element);
        },

        onclick: function(e) {
            this.toggle();
        },

        toggle: function() {
            if (this.isShow) {
                this.hide();
            } else {
                this.show();
            }
        },

        show: function () {
            var e = { currentTarget: this.$element[0], isShow: this.isShow};
            if (!this.isShow && (this.options.onShow(e) & this.options.onToggle(e))) {
                this.isShow = true;
                this.$icon.removeClass('image-eye-closed').addClass('image-eye-open');
                this.$element[0].type = 'text';
                if (this.retypeInput) this.retypeInput[0].type = 'text';
            }
        },

        hide: function() {
            var e = { currentTarget: this.$element[0], isShow: this.isShow };
            if (this.isShow && (this.options.onHide(e) & this.options.onToggle(e))) {
                this.isShow = false;
                this.$icon.removeClass('image-eye-open').addClass('image-eye-closed');
                this.$element[0].type = 'password';
                if (this.retypeInput) this.retypeInput[0].type = 'password';
            }
        },

        destroy: function() {
            this.$icon.unbind().remove();
            this.$element.unwrap();
        }
    };
})(jQuery);