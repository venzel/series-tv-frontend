import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
    selector: '[mask]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: MaskDirective,
            multi: true,
        },
    ],
})
export class MaskDirective implements ControlValueAccessor {
    onTouched: any;
    onChange: any;

    @Input('mask') mask: string;

    constructor(private el: ElementRef) {}

    writeValue(value: any) {
        if (value) {
            this.el.nativeElement.value = this.aplicarMask(value);
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    @HostListener('keyup', ['$event'])
    onKeyup($event: any) {
        let valor: string = $event.target.value.replace(/\D/g, '');

        // retorna caso pressionado backspace
        if ($event.keyCode === 8) {
            this.onChange(valor);
            return;
        }

        let pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
        if (valor.length <= pad.length) {
            this.onChange(valor);
        }

        $event.target.value = this.aplicarMask(valor);
    }

    @HostListener('blur', ['$event'])
    onBlur($event: any) {
        if ($event.target.value.length === this.mask.length) {
            return;
        }
        this.onChange('');
        $event.target.value = '';
    }

    aplicarMask(valor: string): string {
        valor = valor.replace(/\D/g, '');
        let pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
        let valorMask = valor + pad.substring(0, pad.length - valor.length);
        let valorMaskPos = 0;

        valor = '';
        for (let i = 0; i < this.mask.length; i++) {
            if (isNaN(parseInt(this.mask.charAt(i)))) {
                valor += this.mask.charAt(i);
            } else {
                valor += valorMask[valorMaskPos++];
            }
        }

        if (valor.indexOf('_') > -1) {
            valor = valor.substr(0, valor.indexOf('_'));
        }

        return valor;
    }
}
