const fs = require('fs');
const { viewPost } = require('../utils/KleavenUtil');

// Mock the file system
jest.mock('fs');

describe('Unit Tests for viewPost (KleavenUtil)', () => {
  let mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  // Test 1: Success
  it('should return 200 when a valid ID is provided', () => {
    const mockPosts = JSON.stringify([{ id: 123, title: 'Test Post' }]);
    fs.readFileSync.mockReturnValue(mockPosts);

    const mockReq = { params: { id: '123' } };
    viewPost(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  // Test 2: Invalid ID Format
  it('should return 400 when ID format is invalid', () => {
    const mockReq = { params: { id: 'abc' } };
    viewPost(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  // Test 3: Not Found
  it('should return 404 when ID does not exist', () => {
    const mockPosts = JSON.stringify([{ id: 999 }]);
    fs.readFileSync.mockReturnValue(mockPosts);

    const mockReq = { params: { id: '123' } };
    viewPost(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  // Test 4: Server Error
  it('should return 500 when file read fails', () => {
    fs.readFileSync.mockImplementation(() => { throw new Error('Disk Failure'); });
    const mockReq = { params: { id: '123' } };
    viewPost(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});