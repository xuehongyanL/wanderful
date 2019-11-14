import emitter from './ev';

describe('Emitter', () => {
  const mockFunc = jest.fn();
  beforeEach(() => {
    emitter.on('text', mockFunc);
    emitter.on('json', mockFunc);
    emitter.on('createObj', mockFunc);
    emitter.on('deleteObj', mockFunc);
    emitter.on('editObj', mockFunc);
  });
  it('Text update', () => {
    emitter.emit('text', 1);
    emitter.emit('json', 2);
    emitter.emit('createObj', 3);
    emitter.emit('deleteObj', 4);
    emitter.emit('editObj', 5);
    expect(mockFunc.mock.calls.length).toEqual(5);
    expect(mockFunc.mock.calls).toEqual([[1], [2], [3], [4], [5]]);
  });
});