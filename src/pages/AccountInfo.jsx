const AccountInfo = ({ user, onLogout }) => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Account Information
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <p className="block w-full px-3 py-1.5 text-gray-900">
                {user?.name || 'Not available'}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <p className="block w-full px-3 py-1.5 text-gray-900">
                {user?.email || 'Not available'}
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={onLogout}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;