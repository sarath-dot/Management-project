import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectListDialogComponent } from '../project-list-dialog/project-list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  dataSource: any = [];
  displayedColumns: string[] = ['name', 'description', 'created'];

  loading: boolean = true;
  projectList: any = [];
  userData: any;

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProjectList();
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    this.displayedColumns = this.userData.group_id == 2 ? [...this.displayedColumns, 'actions'] : [...this.displayedColumns];
  }

  getProjectList() {
    this.dashboardService.getProjectList().subscribe(res => {
      if (res) {
        this.projectList = res.projectList;
        this.dataSource = new MatTableDataSource(this.projectList);
      }
    })
  }

  addProjectList() {
    const dialogRef = this.dialog.open(ProjectListDialogComponent, {
      data: { isEdit: false }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        let payload = {
          name: result.name,
          description: result.description
        }
        this.dashboardService.emit('notify', { text: 'added' });
        this.dashboardService.addProjectList(payload).subscribe(res => {
          this.loading = false;
          if (res) {
            this.projectList.push(res.result);
            this.dataSource = new MatTableDataSource(this.projectList);
            this.toastr.success('', 'Project added successfully');
          } else {
            this.toastr.error('', 'Project cannot be added. Please try again later')
          }
        })
      }
    })
  }

  updateProjectList(formvalue: any, id: any) {
    const dialogRef = this.dialog.open(ProjectListDialogComponent, {
      data: { isEdit: true, formValue: formvalue }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        let payload = {
          name: result.name,
          description: result.description
        }
        this.dashboardService.updateProjectList(id, payload).subscribe(res => {
          this.loading = false;
          if (res) {
            let index = this.projectList.findIndex((project: any) => project.id == id)
            this.projectList.slice(1, index);
            this.projectList[index] = res.projectList;
            this.dataSource = new MatTableDataSource(this.projectList);
            this.toastr.success('', 'Project edited successfully');
          } else {
            this.toastr.error('', 'Project cannot be edited. Please try again later')
          }
        })
      }
    })
  }

  deleteProjectList(id: any) {
    const dialogRef = this.dialog.open(ProjectListDialogComponent, {
      data: { isDelete: true }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'submit') {
        this.loading = true;
        this.dashboardService.deleteProjectList(id).subscribe(res => {
          this.loading = false;
          if (res && res.success) {
            this.projectList = this.projectList.filter((project: any) => project.id !== id);
            this.dataSource = new MatTableDataSource(this.projectList);
            this.toastr.success('', 'Project deleted successfully');
          } else {
            this.toastr.success('', 'Project cannot be deleted. Please try again');
          }
        })
      }
    })
  }

}
