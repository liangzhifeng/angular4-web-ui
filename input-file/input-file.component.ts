import { Component, Input, Output, ElementRef, ViewChild, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'gh-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  @Input() size: string = ''; // large=36px x-large=48px
  @Input() width: string = '';
  @Input() acceptExtensions = '*';

  @Output() selectFile: EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor() {
  }

  ngOnInit() {
  }

  onFileChange() {
    this.selectFile.emit(this.input.nativeElement.files);

    this.input.nativeElement.value = '';
  }

}
