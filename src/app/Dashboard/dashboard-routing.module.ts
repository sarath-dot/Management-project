import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProjectListComponent } from "./components/project-list/project-list.component";

const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        children: [
            { path: 'project-list', component: ProjectListComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }    