import { SanitazeHtmlPipe } from './sanitaze-html.pipe';

describe('SanitazeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitazeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
