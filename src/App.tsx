import { useState, useEffect, useMemo } from 'react';
import { User, FilterState } from './types/User';
import { fetchUsers } from './services/userService';
import UserCard from './components/UserCard';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    city: '',
    company: ''
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await fetchUsers();
        setUsers(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const uniqueCities = useMemo(() => {
    const cities = users.map(user => user.address.city);
    return Array.from(new Set(cities)).sort();
  }, [users]);

  const uniqueCompanies = useMemo(() => {
    const companies = users.map(user => user.company.name);
    return Array.from(new Set(companies)).sort();
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCity = !filters.city || user.address.city === filters.city;
      const matchesCompany = !filters.company || user.company.name === filters.company;
      
      return matchesSearch && matchesCity && matchesCompany;
    });
  }, [users, filters]);

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleCityChange = (value: string) => {
    setFilters(prev => ({ ...prev, city: value }));
  };

  const handleCompanyChange = (value: string) => {
    setFilters(prev => ({ ...prev, company: value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', city: '', company: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full p-3 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const hasActiveFilters = filters.search || filters.city || filters.company;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Directory</h1>
          <p className="text-gray-600">Browse and filter through our user database</p>
        </header>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search by name
              </label>
              <input
                id="search"
                type="text"
                placeholder="Enter user name..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Search users by name"
              />
            </div>

            <div>
              <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by city
              </label>
              <select
                id="city-filter"
                value={filters.city}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Filter users by city"
              >
                <option value="">All cities</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="company-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by company
              </label>
              <select
                id="company-filter"
                value={filters.company}
                onChange={(e) => handleCompanyChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Filter users by company"
              >
                <option value="">All companies</option>
                {uniqueCompanies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                aria-label="Clear all filters"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredUsers.length} of {users.length} users
            </span>
            {hasActiveFilters && (
              <span className="text-blue-600">
                Active filters applied
              </span>
            )}
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-3 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters to see more results.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;