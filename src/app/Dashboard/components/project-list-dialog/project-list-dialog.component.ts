import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-list-dialog',
  templateUrl: './project-list-dialog.component.html',
  styleUrls: ['./project-list-dialog.component.scss']
})
export class ProjectListDialogComponent implements OnInit, OnDestroy {

  projectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data.isEdit && this.data?.formValue) {
      this.projectForm.patchValue({
        name: this.data?.formValue.name ? this.data?.formValue.name : '',
        description: this.data?.formvalue.description ? this.data?.formValue.description : ''
      })
    }

  }

  onSubmit() {
    this.dialogRef.close(this.projectForm.value);
  }

  onsubmit() {
    this.dialogRef.close('submit');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {

  }

}
