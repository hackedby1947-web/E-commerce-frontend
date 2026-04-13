import  {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';

const MyProfile = ({openEditProfile} ) => {


const { user } = useContext(AuthContext);

const displayName = user?.name || "User";
// const displayContact = user?.mobile || user?.email || "";
const email = user?.email || "";
const mobile = user?.mobile || "";
const gender = user?.gender || "";
const dateOfBirth = user?.dateOfBirth || "";





  return (
    <div className="bg-white md:rounded-lg shadow-sm border border-slate-100 overflow-hidden min-h-100">
      <div className="p-8">
        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-800 mb-8">My Profile</h3>
        
        {/* Profile Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 max-w-4xl">
          
          {/* Full Name */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-700">Full Name</p>
            <p className="text-slate-500 text-sm">{displayName}</p>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-700">Email</p>
            <p className="text-slate-500 text-sm">{email}</p>
          </div>

          {/* Birthday */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-700">Birthday</p>
            <p className="text-slate-500 text-sm italic">{dateOfBirth.split('T')[0]}</p>
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-700">Phone Number</p>
            <p className="text-slate-500 text-sm italic">{mobile}</p>
          </div>

          {/* Gender */}
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-700">Gender</p>
            <p className="text-slate-500 text-sm italic">{gender}</p>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-12 justify-end flex flex-wrap gap-4">
          <button
          onClick={openEditProfile} 

          className="px-8 py-2.5 border border-slate-200 rounded-full text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            Edit Profile
          </button>
          <button className="px-8 py-2.5 border border-slate-200 rounded-full text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;