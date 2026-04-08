import { Component, signal } from '@angular/core';
import { Task } from './tasks.model';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  tasks = signal<Task[]>([]);
  newTask = signal('');

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newTask.set(input.value);
  }

  addTaks() {
    const title = this.newTask().trim;

    if (!title) return;

    this.tasks.update((t) => [
      ...t,
      {
        id: Date.now(),
        title: this.newTask(),
        status: false,
      },
    ]);

    this.newTask.set('');
  }

  removeTask(id: number) {
    this.tasks.update((t) => t.filter((task) => task.id !== id));
  }

  taskStatusChange(id: number) {
    this.tasks.update((t) =>
      t.map((task) => {
        if (task.id === id) {
          return { ...task, status: !task.status };
        }
        return task;
      }),
    );
  }
}
