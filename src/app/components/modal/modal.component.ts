import { Component, inject, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: `
  .dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: white;
  }
  .light-blue-backdrop {
    background-color: #5cb3fd;
  }
`,
})
export class ModalComponent {
  private modalService = inject(NgbModal);

  public openCentralModal(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }
}
