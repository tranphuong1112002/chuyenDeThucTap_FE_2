import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PopupConfirmService } from '../../popupConfirm/popup-confirm.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() isDisable: boolean = false;
  @Input() title: string = '';
  @Input() iconType: string = '';
  @Input() buttonType: NzButtonType = 'primary';
  @Input() isDanger: boolean = false;
  @Input() popupTitle: string = 'modal title';
  @Input() canShowConfirm: boolean = false;
  @Input() className: string = '';
  @Input() popupContent: any = '<b style="color: red;">Some descriptions</b>';
  @Output() btnClick = new EventEmitter();
  @Output() confirmClick = new EventEmitter();

  constructor(private popupConfirm: PopupConfirmService) {}

  onClick() {
    if (this.canShowConfirm == true) {
      this.showConfirm();
    } else this.btnClick.emit();
  }
  showConfirm(): void {
    this.popupConfirm.showPopupConfirm(
      this.popupTitle,
      this.popupContent,
      this.isDanger,
      () => this.confirmClick.emit()
    );
  }
}
