import { OnInit, Component, Input, HostBinding, ElementRef, TemplateRef, ContentChild } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
import { UpdateHostClassService } from '../shared';

export type ThySizes = 'default' | 'sm';

export type ThyType = 'primary' | 'success' | 'primary-weak' | 'success-weak';

export type thyLayout = 'vertical' | 'horizontal';

@Component({
    selector: 'thy-vote,[thyVote]',
    templateUrl: './vote.component.html',
    providers: [UpdateHostClassService]
})
export class ThyVoteComponent implements OnInit {
    _size: ThySizes;

    _type: ThyType;

    _layout: thyLayout;

    _initialized = false;

    _isRound = false;

    @HostBinding(`class.thy-vote`) class = true;

    @HostBinding(`class.has-voted`) _hasVoted = true;

    @Input()
    set thySize(value: ThySizes) {
        this._size = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input()
    set thyVote(value: ThyType) {
        this._type = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input()
    set thyRound(value: boolean) {
        this._isRound = inputValueToBoolean(value);
    }

    @Input()
    set thyLayout(value: thyLayout) {
        this._layout = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input() thyVoteCount: number | string;

    @Input() thyIcon = 'thumb-up';

    @Input()
    set thyHasVoted(value: boolean) {
        this._hasVoted = inputValueToBoolean(value);
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @ContentChild('voteIcon') voteIcon: TemplateRef<any>;

    constructor(private elementRef: ElementRef, private updateHostClassService: UpdateHostClassService) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this._setClassesByType();
        this._initialized = true;
    }

    _setClassesByType() {
        const classNames = [];
        if (!this._type) {
            this._type = 'primary';
        }
        if (!this._layout) {
            this._layout = 'horizontal';
        }
        if (!this._size) {
            this._size = 'default';
        }
        if (this._isRound) {
            classNames.push('thy-vote-round');
        }
        classNames.push(`thy-vote-${this._type}`);
        classNames.push(`thy-vote-${this._layout}`);
        classNames.push(`thy-vote-${this._layout}-size-${this._size}`);
        this.updateHostClassService.updateClass(classNames);
    }
}