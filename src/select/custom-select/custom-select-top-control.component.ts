import {
    Component,
    Input,
    TemplateRef,
    EventEmitter,
    Output,
    ViewChild,
    ElementRef,
    Renderer2,
    OnInit,
    ChangeDetectionStrategy
} from '@angular/core';
import { ThyOptionComponent } from './option.component';
import { UpdateHostClassService } from '../../shared';

@Component({
    selector: 'thy-custom-select-top-control,[thyCustomSelectTopControl]',
    templateUrl: './custom-select-top-control.component.html',
    providers: [UpdateHostClassService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyCustomSelectTopControlComponent implements OnInit {
    inputValue = '';

    isComposing = false;

    panelOpened = false;

    isMultiple = false;

    showSearch = false;

    disabled = false;

    selectedOptions: ThyOptionComponent[];

    @Input()
    get thyPanelOpened(): boolean {
        return this.panelOpened;
    }

    set thyPanelOpened(value: boolean) {
        this.panelOpened = value;
        if (this.panelOpened && this.inputElement) {
            Promise.resolve(null).then(() => {
                this.inputElement.nativeElement.focus();
            });
        }
        if (!this.panelOpened && this.inputElement) {
            Promise.resolve(null).then(() => {
                this.setInputValue('');
            });
        }
        this.setSelectionClass();
    }

    @Input()
    get thyIsMultiple(): boolean {
        return this.isMultiple;
    }

    set thyIsMultiple(value: boolean) {
        this.isMultiple = value;
        this.setSelectionClass();
    }

    @Input()
    get thyShowSearch(): boolean {
        return this.showSearch;
    }

    set thyShowSearch(value: boolean) {
        this.showSearch = value;
        this.setSelectionClass();
    }

    @Input()
    get thySelectedOptions(): ThyOptionComponent[] {
        return this.selectedOptions;
    }

    set thySelectedOptions(value: ThyOptionComponent[]) {
        if (this.selectedOptions === value) {
            return;
        }
        this.selectedOptions = value;
        if (this.panelOpened && this.inputElement) {
            Promise.resolve(null).then(() => {
                this.setInputValue('');
            });
            this.inputElement.nativeElement.focus();
        }
    }

    @Input()
    get thyDisabled(): boolean {
        return this.disabled;
    }

    set thyDisabled(value: boolean) {
        this.disabled = value;
        this.setSelectionClass();
    }

    @Input()
    customDisplayTemplate: TemplateRef<any>;

    @Input()
    allowClear = false;

    @Input()
    placeholder = '';

    @Output()
    thyOnSearch = new EventEmitter<string>();

    @Output()
    public thyOnRemove = new EventEmitter<{ item: ThyOptionComponent; $eventOrigin: Event }>();

    @Output()
    public thyOnClear = new EventEmitter<Event>();

    @ViewChild('inputElement')
    inputElement: ElementRef;

    get selectedValueStyle(): { [key: string]: string } {
        let showSelectedValue = false;
        if (this.showSearch) {
            if (this.panelOpened) {
                showSelectedValue = !(this.isComposing || this.inputValue);
            } else {
                showSelectedValue = true;
            }
        } else {
            showSelectedValue = true;
        }
        return { display: showSelectedValue ? 'block' : 'none' };
    }

    get placeholderStyle(): { [key: string]: string } {
        let placeholder = true;
        if (this.isSelectedValue) {
            placeholder = false;
        }
        if (!this.placeholder) {
            placeholder = false;
        }
        if (this.isComposing || this.inputValue) {
            placeholder = false;
        }
        return { display: placeholder ? 'block' : 'none' };
    }

    get selectedValue(): any {
        return this.thySelectedOptions.length ? this.thySelectedOptions[0] : null;
    }

    get customDisplayContext(): any {
        return this.thySelectedOptions.length
            ? this.thySelectedOptions[0].thyRawValue || this.thySelectedOptions[0].thyValue
            : null;
    }

    get multipleSelectedValue(): any {
        return this.thySelectedOptions;
    }

    get showClearIcon(): boolean {
        return this.allowClear && this.isSelectedValue && !this.panelOpened;
    }

    get isSelectedValue(): boolean {
        return (!this.isMultiple && this.selectedValue) || (this.isMultiple && this.multipleSelectedValue.length);
    }

    constructor(
        private renderer: Renderer2,
        private element: ElementRef<any>,
        private updateHostClassService: UpdateHostClassService
    ) {
        this.updateHostClassService.initializeElement(this.element.nativeElement);
    }

    ngOnInit() {
        this.setSelectionClass();
    }

    setSelectionClass() {
        const modeType = this.isMultiple ? 'multiple' : 'single';
        const selectionClass = {
            [`form-control`]: true,
            [`form-control-custom`]: true,
            [`custom-select-selection`]: true,
            [`custom-select-selection-${modeType}`]: true,
            [`custom-select-selection-show-search`]: this.showSearch,
            [`panel-is-opened`]: this.panelOpened,
            [`disabled`]: this.disabled
        };
        this.updateHostClassService.updateClassByMap(selectionClass);
    }

    setInputValue(value: string) {
        this.inputValue = value;
        this.updateWidth();
        this.thyOnSearch.emit(this.inputValue);
    }

    updateWidth() {
        if (this.isMultiple && this.inputElement) {
            if (this.inputValue || this.isComposing) {
                this.renderer.setStyle(
                    this.inputElement.nativeElement,
                    'width',
                    `${this.inputElement.nativeElement.scrollWidth}px`
                );
            } else {
                this.renderer.removeStyle(this.inputElement.nativeElement, 'width');
            }
        }
    }

    removeHandle(item: ThyOptionComponent, $event: Event) {
        this.thyOnRemove.emit({ item: item, $eventOrigin: $event });
    }

    clearHandle($event: Event) {
        this.thyOnClear.emit($event);
    }

    trackValue(_index: number, option: ThyOptionComponent): any {
        return option.thyValue;
    }
}
