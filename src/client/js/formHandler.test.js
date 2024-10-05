
import { handleSubmit } from './formHandler';

describe('handleSubmit', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="form">
        <input id="input-text" value="test" />
        <button type="submit">Submit</button>
      </form>
      <div id="results"></div>
    `;
  });

  it('should call fetch with correct parameters', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          polarity: 'positive',
          subjectivity: 'subjective',
          sentence_list: [
            { text: 'example text', score_tag: 'positive', confidence: 'high' }
          ]
        })
      })
    );

    const event = {
      preventDefault: jest.fn()
    };

    handleSubmit(event);

    expect(fetch).toHaveBeenCalledWith('/analyze', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ inputText: 'test' })
    }));
  });
});
