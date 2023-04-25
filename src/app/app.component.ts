import { Component } from '@angular/core';
import { Task } from './task/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todo: Task[] = [
    {
      organization: 'Azad Foundation : Gender Empowerment http://azadfoundation.com/',
      review: 'The program of Azad that I was primarily connected with this summer was their “Men for Gender Justice” program. This program works on conducting gender sensitization programs for men from the slums. . I was made responsible for 2 signature events that Azad had lined up, the first of which was organizing a two-day cricket tournament for all their trainees that were associated with their MGJ program and the event was to take place on the 9th and 10th of June, the second event was a meeting with Auto-Drivers and Auto-Drivers’ Unions in Jaipur city to discuss lack of safety for women in Jaipur in public transport (especially in autos). I was also responsible for building upon my research work from the summer of 2016 (when I interned with Azad Foundation in New Delhi) on the topic “Problems Faced By Women In The Urban Transport Sector In India”. My final task was to work on and summarize a report on “Unsafe Spaces for Women In Jaipur” and also translate the report into Hindi.'
    },
    {
      organization: 'Human Rights Foundation : Human Rights/Law https://www.themaven.net/humanrightsfoundation',
      review: "Some of my tasks included editing human rights guides, making a toolkit for HRF's Flash Drives for Freedom, researching on current news, vetting possible partnerships, and translating emails and news from Korean to English and vice versa. One of the weaknesses of my organization was that because various projects were taking place at once, there was a lack of communication for everyone at the organization to be aware of what was going on. Another weakness I saw was in the work atmosphere. There was little verbal talking outside of meetings because each individual was focused on what they were doing. My organizations strengths were being open to sharing ideas and taking on new projects. My boss was very flexible and encouraged me to form my PE to be so that it would be valuable to me. While others may view it as being a weakness, and though it did require getting used to on my part, I found the lack of structure I had in fulfilling my tasks as a strength of the organization because it added on to challenging myself to develop new skills, such as vetting musicians to invite to our conferences, brainstorming for potential op-eds to write, doing detailed background research on a artist who wanted to collaborate with us, etc. Another strength of this organization was encouraging staff to know what was best for them to be productive, such as like working from home or taking as many breaks needed, and the incorporation of bi-weekly viewing of documentaries related to human rights violations. "
    },
    {
      organization: "Goodwill Industries East Bay : Information Technology http://eastbaygoodwill.org",
      review: "I worked with Goodwill Industries East Bay and its most recent acquisition, Golden State Court Reporting College. I worked mostly on marketing and helping spread the information about Goodwill's employment/training services, and its acquisition's opportunities. It was great. I would bart out to the offices in Pleasanton. The weather was almost always sunny. We had meetings one day a week where ideas would be suggested to me. I worked on my computer. I took photographs for the social media accounts. Weaknesses would be that people were not too computer-savvy. Strengths were that people who worked there genuinely cared for the people they were helping. They want to get the word out about what their organizations can do for people. "
    }
  ];
  inProgress: Task[] = [];
  done: Task[] = [];

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
      if (!result) {
        return;
      }
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  // Add tasks!
  constructor(private dialog: MatDialog) {}

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.todo.push(result.task);
      });
  }

}
