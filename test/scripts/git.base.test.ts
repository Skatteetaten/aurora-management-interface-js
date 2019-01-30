import { createGitProperties } from '../../src/scripts/git.base';

describe('Create Git properties', () => {
  it('should create time and ref information for git v1', () => {
    const gitProperties = createGitProperties({ writeToDisk: false });
    expect(gitProperties['commit.time/v1']).not.toBe('');
    expect(gitProperties['commit.ref/v1']).not.toBe('');
  });
});
