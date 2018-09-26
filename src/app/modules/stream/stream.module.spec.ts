import { StreamModule } from './stream.module';

describe('StreamModule', () => {
  let streamModule: StreamModule;

  beforeEach(() => {
    streamModule = new StreamModule();
  });

  it('should create an instance', () => {
    expect(streamModule).toBeTruthy();
  });
});
