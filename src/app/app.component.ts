import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  tasks = signal<string[]>([]);
  newTask = signal('');

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newTask.set(input.value);
  }

  addTaks() {
    const title = this.newTask().trim;

    if (!title) return;

    this.tasks.update((t) => [...t, this.newTask()]);

    this.newTask.set('');
  }

  removeTask(index: number) {
    this.tasks.update((t) => t.filter((_, i) => i !== index));
  }
}
