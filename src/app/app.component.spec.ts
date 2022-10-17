import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { Calendar, Maximize2, Disc, Unlock, Sun, PlusSquare, Link, Mail } from 'angular-feather/icons';
import { DebugElement } from '@angular/core';

const icons = {
  Calendar,
  Maximize2,
  Disc,
  Unlock,
  Sun,
  PlusSquare,
  Link,
  Mail
};


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        FeatherModule.pick(icons)
      ],
    }).compileComponents();
  });
  // *****************
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should make visible actions', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const { debugElement } = fixture;
    expect(app.showAction).withContext("In initial render is hidde").toBe(false);
    const input = debugElement.query(By.css('input'));
    input.triggerEventHandler('focus', null)
    expect(app.showAction).withContext("Show actions after focus").toBe(true);
  });

  it('should sendText to displayTextInput', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const oldText = app.displayTextInput
    const newText = "Mundo";
    app.sendText(newText);
    expect(app.displayTextInput).withContext("Update displayTextInput with new text").toBe(oldText.concat(app.textTransform(newText,0)));
  });

  it('should transformText(text, 1 | 0)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const text: string = "#Important mensagge to @user on http://insecure.link or https://secure.link";
    const resTask: string = "<span class='important-chip task-chip'>#Important</span><p>mensa-chip'>@user</span><p>on</p><span class='link-chip task-chip'>http://insecure.link</span><p>or</p><span class='link-chip task-chip'>https://secure.link</span>";
    const resInput: string = "<p> <span class='color-important'>#Important</span> mensagge to <span class='color-user'>@user</span> on http://insecure.link or https://secure.link</p>";
    expect(app.textTransform(text, 1)).withContext("Text transformed to task").toBe(resTask);
    expect(app.textTransform(text, 0)).withContext("Text transformed to input").toBe(resInput);
  });

  it('should select task', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.selected(1);
    expect(app.editMode).withContext("Edit mode should be active").toBe(1);
    expect(app.indexTaskSelected).withContext("Save the index of the task").toBe(1);
  });

  it('should add with addOrUpdateTask()', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.taskTextInput = "Test task"
    app.editMode = 0;
    // const oldTasks = app.tasks.length
    app.addOrUpdateTask()
    expect(app.tasks.length).withContext("Task list should have 1 task").toBeGreaterThan(0);
  });

  it('should update task with addOrUpdateTask()', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const tasks = app.tasks;
    const indexTask = app.indexTaskSelected; 
    const oldTask = tasks[indexTask]; 
    app.editMode = 1;
    app.addOrUpdateTask()
    expect(tasks[indexTask] !== oldTask).withContext("Task list should have 1 task").toBe(true);
  });
  // ***********

  
  it('should delete last letter displayTextInput', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const input: string = "<p><span class='color-important'> #Important</span>mensaggeto<span class='color-user'> @user</span>onhttp://insecure.linkorhttps://secure.link</p>";
    const resInput: string = "<p> <p><span class='color-important'> <span class='color-important'>#Important</span>mensaggeto<span</span> class='color-user'> <span class='color-user'>@user</span>onhttp://insecure.linkorhttps://secure.lin</p></span></p>";
    app.sendText(resInput);
    console.log(app.taskForm.controls.inputTask.value)
    app.deleteLetterDisplayTextInput();
    expect(app.displayTextInput).withContext("Task list should have 1 task").toBe(resInput);
  });

  // it('should focus once', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const { debugElement } = fixture;
  //   const input = debugElement.query(By.css('input'));
  //   fixture.detectChanges();
  //   input.triggerEventHandler('focus', null)
  //   fixture.detectChanges();
  //   hasContent(queryDebugElement(de, '.mst-click-count'), '1');
  // });

  // it('should render actions-left--open', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const bannerDe: DebugElement = fixture.debugElement;
  //   const paragraphDe = bannerDe.query(By.css('p'));
  //   const p: HTMLElement = paragraphDe.nativeElement;
  //   console.log(p);
  //   expect(p.textContent).toEqual('banner works!');


  //   // fixture.detectChanges();
  //   // const { debugElement } = fixture;
  //   // const today = fixture.debugElement.query(By.css('.actions-left--today'));
  //   // expect(today).toBeTruthy();
  //   // expect(today.nativeElement?.innerText).toBe('Today');

  //   // expect(compiled.querySelector('.actions-left--open')?.getAttribute('disabled')).toBeFalsy()
  //   // expect(compiled.querySelector('.actions-left--today')).toBeTruthy();
  //   // expect(compiled.querySelector('.actions-left--public')).toBeDefined();
  //   // expect(compiled.querySelector('.actions-left--highlight')).toBeDefined();
  //   // expect(compiled.querySelector('.actions-left--estimation')).toBeDefined();
  //   // expect(compiled.querySelector('.actions-left--open')?.innerHTML).withContext("How many button should render").toEqual('Open');

  // });

  // Test the buttons render

  // it('should render Open button', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   let OpenButton = fixture.debugElement.query(By.css('.actions-left--open'));

  //   // const els = findEls(fixture, 'button-item');
  //   // expect(els.length).withContext("How many button should render").toBe(3)
  //   expect(OpenButton.nativeElement.innerText).withContext("How many button should render").toEqual('Open');
  // });

  // it('should change showAction to true', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   app.setActionVisible();
  //   expect(app.showAction).withContext("showAction should be true").toBe(true);
  // })

  // it('should be empty displayTextInput', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.displayTextInput).withContext("showAction should be true").toBe('');
  // })

  // it('inputTask should empty', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   const { debugElement } = fixture;
  //   expect(app.taskForm.controls.inputTask.value).withContext("In initial form value is empty").toBe('');
  //   // const input = debugElement.query(By.css('input'));
  //   // fixture.detectChanges();
  //   // input.triggerEventHandler('submit', '')
  //   // fixture.detectChanges();
  //   // expect(app.taskForm.controls.inputTask.value).withContext("In initial form value change").toBe('');
  // });



  // it('should render container', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.container')).toBeDefined();
  // });

  // it('should render task-creation', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.task-creation')).toBeDefined();
  // });

  // it(`should have as title 'task-list'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('task-list');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('task-list app is running!');
  // });

});

