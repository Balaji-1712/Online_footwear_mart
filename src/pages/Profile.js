// Profile.js
import React, { useEffect, useState } from 'react';
import Footercommon from '../components/Footercommon';
import { auth, database } from '../firebase';
import { ref, onValue, set } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile({ editable, setEditable }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    email: '',
    address: '',
    mobile: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const profileRef = ref(database, 'users/' + currentUser.uid + '/profile');
        onValue(
          profileRef,
          (snapshot) => {
            if (snapshot.exists()) {
              setProfile(snapshot.val());
            } else {
              setProfile({
                name: '',
                age: '',
                email: currentUser.email || '',
                address: '',
                mobile: currentUser.phoneNumber || '',
              });
            }
            setLoading(false);
            setEditable(false); // reset editable on load
          },
          { onlyOnce: true }
        );
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setEditable]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!user) {
      toast.error('User not logged in!');
      return;
    }

    set(ref(database, 'users/' + user.uid + '/profile'), profile)
      .then(() => {
        toast.success('Profile saved successfully!');
        setEditable(false);
      })
      .catch((error) => {
        toast.error('Error saving profile: ' + error.message);
      });
  };

  const handleCancelEdit = () => {
    if (!user) return;
    const profileRef = ref(database, 'users/' + user.uid + '/profile');
    onValue(
      profileRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.val());
        }
        setEditable(false);
      },
      { onlyOnce: true }
    );
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container-fluid">
      {!user ? (
        <div className="text-center mt-5">Please login to see your profile.</div>
      ) : (
        <div className="form p-3" style={{ maxWidth: 500, margin: '0 auto' }}>
          <h1 className="text-center mb-4">Customer Details</h1>

          <div className="mb-3">
            <input
              type="text"
              className="form-control text-center"
              name="name"
              placeholder="Enter your name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editable}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              className="form-control text-center"
              name="age"
              placeholder="Enter your age"
              value={profile.age}
              onChange={handleChange}
              disabled={!editable}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control text-center"
              name="email"
              placeholder="Enter your email"
              value={profile.email}
              disabled
            />
          </div>

          <div className="mb-3">
            <input
              type="tel"
              className="form-control text-center"
              name="mobile"
              placeholder="Enter your mobile number"
              value={profile.mobile}
              onChange={handleChange}
              disabled={!editable}
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control text-center"
              name="address"
              placeholder="Enter your address"
              rows={3}
              value={profile.address}
              onChange={handleChange}
              disabled={!editable}
            />
          </div>

          {editable ? (
            <>
              <button className="btn btn-success w-100 mb-2" onClick={handleSave}>
                Save Profile
              </button>
              <button className="btn btn-secondary w-100" onClick={handleCancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary w-100" onClick={() => setEditable(true)}>
              Edit Profile
            </button>
          )}
        </div>
      )}

      <Footercommon />
      <ToastContainer />
    </div>
  );
}

export default Profile;
