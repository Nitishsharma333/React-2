import React, { useState } from 'react';

// Simple icon components to replace lucide-react
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const BookIconLarge = () => (
  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const App = () => {
  // Initial book data
  const [books, setBooks] = useState([
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
    { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 5, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" },
    { id: 6, title: "The Catcher in the Rye", author: "J.D. Salinger" }
  ]);

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for adding new books
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  
  // State for form validation
  const [errors, setErrors] = useState({});

  // Filter books based on search query
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle new book input changes
  const handleNewBookChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    
    if (!newBook.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!newBook.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    // Check for duplicate books
    const isDuplicate = books.some(book => 
      book.title.toLowerCase() === newBook.title.trim().toLowerCase() &&
      book.author.toLowerCase() === newBook.author.trim().toLowerCase()
    );
    
    if (isDuplicate) {
      newErrors.title = 'This book already exists in the library';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add new book
  const handleAddBook = () => {
    if (!validateForm()) {
      return;
    }

    const bookToAdd = {
      id: Date.now(), // Simple ID generation
      title: newBook.title.trim(),
      author: newBook.author.trim()
    };

    setBooks(prev => [...prev, bookToAdd]);
    setNewBook({ title: '', author: '' });
    setErrors({});
  };

  // Remove book
  const handleRemoveBook = (bookId) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="text-blue-600 mr-2">
            <BookIcon />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Library Management System</h1>
        </div>
        <p className="text-gray-600">Manage your book collection with ease</p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-sm text-gray-600 mt-2">
            Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
        )}
      </div>

      {/* Add Book Form */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <div className="mr-2">
            <PlusIcon />
          </div>
          Add New Book
        </h2>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Book Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newBook.title}
                onChange={handleNewBookChange}
                placeholder="Enter book title"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={newBook.author}
                onChange={handleNewBookChange}
                placeholder="Enter author name"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  errors.author ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddBook}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <div className="mr-2">
              <PlusIcon />
            </div>
            Add Book
          </button>
        </div>
      </div>

      {/* Books List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Book Collection ({filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''})
        </h2>
        
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-300 mx-auto mb-4">
              <BookIconLarge />
            </div>
            <p className="text-gray-500 text-lg">
              {searchQuery ? 'No books found matching your search.' : 'No books in the library yet.'}
            </p>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="text-blue-600 hover:text-blue-800 mt-2 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {book.title}
                    </h3>
                    <p className="text-gray-600">by {book.author}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveBook(book.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-all"
                    title="Remove book"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{books.length}</p>
            <p className="text-sm text-gray-600">Total Books</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {new Set(books.map(book => book.author)).size}
            </p>
            <p className="text-sm text-gray-600">Authors</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{filteredBooks.length}</p>
            <p className="text-sm text-gray-600">Showing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;