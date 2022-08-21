import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IUpload } from '../interface/iupload';
import { UtilityService } from '../services/utility.service';
declare var window: any;

@Component({
  selector: 'app-docs-management',
  templateUrl: './docs-management.component.html',
  styleUrls: ['./docs-management.component.scss']
})

export class DocsManagementComponent implements OnInit {

  uploadObject!: IUpload;
  uploads: IUpload[] = [];
  formModal: any;
  activeUser = this.util.getActiveUserId()[0]['userid'];
  DELETE_DOC_BY_ID!: number;
  EDIT_DOC_BY_ID!: number;
  documentUploadForm!: FormGroup;
  documentEditForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private util: UtilityService
  ) { }

  ngOnInit(): void {
    this.uploads = this.util.getFromLocalStorage('upload');
    this.documentUploadForm = this.fb.group({
      label: ['', [Validators.required]],
      filename: ['', Validators.required],
    });
    this.documentEditForm = this.fb.group({
      editLabel: ['', Validators.required]
    });
  }

  //Get id 
  editDoc(id: number) {
    this.EDIT_DOC_BY_ID = id;
    console.log(this.EDIT_DOC_BY_ID);
    this.documentEditForm.patchValue({
      editLabel: this.util.getDocumentById(id).label
    });
  }

  //Edit Document
  docOkEdit() {
    let newlabel = this.documentEditForm.get('editLabel')?.value;

    if (this.EDIT_DOC_BY_ID != null) {
      for (let i = 0; i < this.uploads.length; i++) {
        if (this.uploads[i].id == this.EDIT_DOC_BY_ID) {
          this.uploads[i].label = newlabel;
          break;
        }
      }
    }
    this.EDIT_DOC_BY_ID = 0;
    this.util.setToLocalStorage('upload', this.uploads);
    alert('file Updated !')
    this.router.navigateByUrl('docmgt');
  }

  //Get id
  deleteDoc(id: number) {
    console.log(id);
    this.DELETE_DOC_BY_ID = id;
  }

  //Delete Document
  docOkDelete() {
    this.uploads = this.uploads.filter(doc => doc.id !== this.DELETE_DOC_BY_ID);
    this.util.setToLocalStorage('upload', this.uploads);
    this.ngOnInit();
  }

  //Add Document
  addDoc(): void {
    let oldRecord = this.util.getFromLocalStorage('upload');
    let isExist: boolean = false;
    let uploads: IUpload[] = [];
    //Document Object
    this.uploadObject = {
      id: Number(new Date()),
      'label': this.documentUploadForm.value.label,
      'filename': this.documentUploadForm.value.filename.replace('C:\\fakepath\\', ''),
      'uploadedBy': this.activeUser
    };
    //Check file already exists or not
    for (let i = 0; i < oldRecord.length; i++) {
      if (oldRecord[i].filename == this.documentUploadForm.value.filename.replace('C:\\fakepath\\', '')) {
        isExist = true;
      }
    }

    if (isExist) {
      alert('file exists !');
    } else {
      let docList = [];
      uploads = (oldRecord!);
      docList = uploads ? uploads : []; // ternary operator
      docList.push(this.uploadObject);
      this.util.setToLocalStorage('upload', docList);
      this.router.navigateByUrl('docmgt');
      this.ngOnInit();
    }
  }
}
