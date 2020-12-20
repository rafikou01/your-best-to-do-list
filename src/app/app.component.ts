import { Inject, Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Your Best ToDoList';
  newTask = '';
  listTasks: any;
  filter = 'all';
  taskComplete = 0;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    const a = this.storage.get('listTasks');
    this.listTasks = a ? a : [];
    this.setTaskComplete();
  }

  toggleTask(i: number): void{
    this.listTasks[i].check = !this.listTasks[i].check;
    this.saveList();
  }

  addTask(): void {
    if (this.newTask.replace(/\s/g,  '')) {
      this.listTasks.push({text: this.newTask, check: false});
    }
    this.newTask = '';
    this.saveList();
  }

  removeTask(i: number): void {
    this.listTasks.splice(i, 1);
    this.saveList();
  }

  saveList(): void{
    this.storage.set('listTasks', this.listTasks);
    this.setTaskComplete();
  }

  filterList(filter: string): void{
    this.filter = filter;
  }

  removeAll(): void{
    this.listTasks = [];
    this.saveList();
  }

  setTaskComplete(): void {
    this.taskComplete = this.listTasks.filter(s => s.check).length;
  }
}
