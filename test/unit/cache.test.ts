import {
  CacheType,
  getCache,
  saveCache,
  clearMemoryCache,
  saveContentItemsCache,
  removeItemFromCache,
  ContentType,
  getContentItemsCache,
  addItemToCache,
  removePathFromCache,
} from '@utils/cache';

describe('Cache', () => {
  const userAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
  const podName = 'testPod';
  const path = '/test/path';
  const contentItems = {
    files: [{ name: 'file1' }, { name: 'file2' }],
    directories: [{ name: 'dir1' }, { name: 'dir2' }],
  };
  const contentItemsJson = JSON.stringify(contentItems);

  beforeEach(() => {
    clearMemoryCache();
  });

  it('get empty cache', () => {
    const fdpCache = getCache(CacheType.FDP);
    expect(fdpCache).toEqual('{}');
    const contentItemsCache = getCache(CacheType.CONTENT_ITEMS);
    expect(contentItemsCache).toEqual('{}');
  });

  describe('saveCache', () => {
    it('save and get incorrect JSON cache', () => {
      const incorrectJson = 'incorrect json';
      expect(() => saveCache(CacheType.FDP, incorrectJson)).toThrow(
        'Data is not a valid JSON'
      );

      expect(() => saveCache(CacheType.CONTENT_ITEMS, incorrectJson)).toThrow(
        'Data is not a valid JSON'
      );
    });

    it('should save and get FDP cache', () => {
      const fdpData = {
        '3481ff5a4e6f5516f7099c3dfd81ef33989eeae8b899d9cbfb6c093508b03fb5': {
          data: 'xprvA3HiQHsgs48SohP6tMRerYUhhm74xmpAL1wEGCgRNZpbu5SfeDoGu8KXiumCUtTJ4KZA9VFWvcopHdS5HqTSbnMJdUdNm8SSd93u1ZUwBqP',
        },
        '78a70bdc761e892e70ca744a6558528bf35aa86e67eaaec485ff36c4eadd2ce2': {
          data: '{\\"pods\\":[{\\"name\\":\\"pod 1\\",\\"index\\":1,\\"password\\":\\"40f23dc0ca9c5ddf4cc4c0b0ee50b1376822ec487e6c12923e11b28e96ecbeeb\\"},{\\"name\\":\\"pod 2\\",\\"index\\":2,\\"password\\":\\"8b50215707c3a334ff371be9743a908503edbcaee17b31b29bf7c469af372a5b\\"}],\\"sharedPods\\":[]}',
          epoch: {
            level: 30,
            time: 1681296452,
          },
        },
      };
      saveCache(CacheType.FDP, JSON.stringify(fdpData));
      const receivedFdpCache = getCache(CacheType.FDP);
      expect(JSON.parse(receivedFdpCache)).toEqual(fdpData);
    });

    it('should save and get content items cache', () => {
      const contentItemsCache = {};
      saveCache(CacheType.CONTENT_ITEMS, JSON.stringify(contentItemsCache));
      const receivedContentItemsCache = getCache(CacheType.CONTENT_ITEMS);
      expect(JSON.parse(receivedContentItemsCache)).toEqual(contentItemsCache);
    });
  });

  describe('saveContentItemsCache', () => {
    it('should save content items to localStorage when available', () => {
      saveContentItemsCache(userAddress, podName, path, contentItemsJson);
      const cache = JSON.parse(getCache(CacheType.CONTENT_ITEMS));
      expect(cache).toHaveProperty([userAddress, podName, path]);
      expect(cache[userAddress][podName][path]).toEqual(contentItemsJson);
    });

    it('should save content items to memory when localStorage is not available', () => {
      saveContentItemsCache(userAddress, podName, path, contentItemsJson);
      const cache = JSON.parse(getCache(CacheType.CONTENT_ITEMS));
      expect(cache).toHaveProperty([userAddress, podName, path]);
      expect(cache[userAddress][podName][path]).toEqual(contentItemsJson);
    });
  });

  describe('removeItemFromCache and getContentItemsCache', () => {
    it('should remove a file item from the cache', () => {
      saveContentItemsCache(userAddress, podName, path, contentItemsJson);
      const { contentItems: contentItems0 } = getContentItemsCache(
        userAddress,
        podName,
        path
      );
      expect(contentItems0.files).toHaveLength(2);
      expect(contentItems0.files).toContainEqual({ name: 'file1' });

      removeItemFromCache(
        userAddress,
        podName,
        path,
        'file1',
        ContentType.FILE
      );
      const { contentItems } = getContentItemsCache(userAddress, podName, path);
      expect(contentItems.files).toHaveLength(1);
      expect(contentItems.files).not.toContainEqual({ name: 'file1' });
    });

    it('should remove a directory item from the cache', () => {
      saveContentItemsCache(userAddress, podName, path, contentItemsJson);
      const { contentItems: contentItems0 } = getContentItemsCache(
        userAddress,
        podName,
        path
      );
      expect(contentItems0.directories).toHaveLength(2);
      expect(contentItems0.directories).toContainEqual({ name: 'dir1' });

      removeItemFromCache(
        userAddress,
        podName,
        path,
        'dir1',
        ContentType.DIRECTORY
      );

      const { contentItems } = getContentItemsCache(userAddress, podName, path);
      expect(contentItems.directories).toHaveLength(1);
      expect(contentItems.directories).not.toContainEqual({ name: 'dir1' });
    });

    it('should throw an error when given an unknown content type', () => {
      expect(() =>
        removeItemFromCache(
          userAddress,
          podName,
          path,
          'unknown',
          'unknown' as ContentType
        )
      ).toThrowError('Unknown content type');
    });
  });

  describe('addItemToCache', () => {
    it('should add a file item to the cache', () => {
      const newFile = { name: 'file3' };

      saveContentItemsCache(userAddress, podName, path, contentItemsJson);
      const { contentItems: contentItems0 } = getContentItemsCache(
        userAddress,
        podName,
        path
      );
      expect(contentItems0.files).toHaveLength(2);
      expect(contentItems0.files).not.toContainEqual(newFile);

      addItemToCache(userAddress, podName, path, newFile, ContentType.FILE);

      const { contentItems } = getContentItemsCache(userAddress, podName, path);
      expect(contentItems.files).toHaveLength(3);
      expect(contentItems.files).toContainEqual(newFile);
    });

    it('should add a directory item to the cache', () => {
      const newDirectory = { name: 'dir3' };

      saveContentItemsCache(userAddress, podName, path, contentItemsJson);
      const { contentItems: contentItems0 } = getContentItemsCache(
        userAddress,
        podName,
        path
      );
      expect(contentItems0.directories).toHaveLength(2);
      expect(contentItems0.directories).not.toContainEqual(newDirectory);

      addItemToCache(
        userAddress,
        podName,
        path,
        newDirectory,
        ContentType.DIRECTORY
      );

      const { contentItems } = getContentItemsCache(userAddress, podName, path);
      expect(contentItems.directories).toHaveLength(3);
      expect(contentItems.directories).toContainEqual(newDirectory);
    });

    it('should throw an error when given an unknown content type', () => {
      const unknownItem = { name: 'unknown' };
      expect(() =>
        addItemToCache(
          userAddress,
          podName,
          path,
          unknownItem,
          'unknown' as ContentType
        )
      ).toThrowError('Unknown content type');
    });
  });

  describe('removePathFromCache', () => {
    const path1 = '/test/path1';
    const path2 = '/test/path2';
    const contentItems = '{"files": [], "directories": []}';

    beforeEach(() => {
      clearMemoryCache();
      saveContentItemsCache(userAddress, podName, path1, contentItems);
      saveContentItemsCache(userAddress, podName, path2, contentItems);
    });

    it('should remove the specified path from the cache', () => {
      removePathFromCache(userAddress, podName, path1);
      const cache = JSON.parse(getCache(CacheType.CONTENT_ITEMS));
      expect(cache[userAddress][podName]).not.toHaveProperty(path1);
      expect(cache[userAddress][podName]).toHaveProperty(path2);

      removePathFromCache(userAddress, podName, path2);
      const cache2 = JSON.parse(getCache(CacheType.CONTENT_ITEMS));
      expect(cache2[userAddress][podName]).not.toHaveProperty(path1);
      expect(cache2[userAddress][podName]).not.toHaveProperty(path2);
    });
  });
});
