import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

const Dashboard = ({user}) => {
    const [meetings, setMeetings] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if(user.isAdmin) {
            getUsers();
        }

        getMeetings();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/user/all', { withCredentials: true });
        if(response.data) {
            setAllUsers(response.data);
        }
    }

    const getMeetings = async () => {
        const response = await axios.get('http://localhost:5000/meeting', { withCredentials: true });
        if(response.data) {
            setMeetings(response.data);
        }
    }

    const openModal = () => {
        document.getElementById('modal').showModal();
    };

    const closeModal = () => {
        document.getElementById('modal').close();
    };

    const confirmModal = () => {
        document.getElementById('modal').close();
    };

    const newMeeting = async (e) => {
        e.preventDefault();
        try {
            const title = document.getElementById('title').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            let confirmed = false;

            if(user.isAdmin) {
                confirmed = true;
            }

            const response = await axios.post('http://localhost:5000/meeting/add', {
                title: title,
                date: date,
                time: time,
                confirmed: confirmed
            }, { withCredentials: true });
            if(response.status === 200) {
                toast('Meeting created!', {
                    duration: 1500,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    icon: '👏',
                });
                getMeetings();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const closeModalDelete = (id) => {
        document.getElementById('modalDelete').close();
        const elem = document.getElementById('confirmDelete');
        elem.replaceWith(elem.cloneNode(true));
    };

    const confirmModalDelete = (id) => {
        document.getElementById('modalDelete').close();
        const elem = document.getElementById('confirmDelete');
        elem.replaceWith(elem.cloneNode(true));
    };

    const checkDeleteMeeting = (id) => {
        document.getElementById('modalDelete').showModal();
        document.getElementById('confirmDelete').addEventListener('click', () => {
            deleteMeeting(id);
        });
    };

    const deleteMeeting = async (id) => {
        const elem = document.getElementById('confirmDelete');
        elem.replaceWith(elem.cloneNode(true));
        try {
            const response = await axios.delete('http://localhost:5000/meeting/' + id, { withCredentials: true });
            if(response.status === 200) {
                toast('Meeting Canceld!', {
                    duration: 1500,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    icon: '👏',
                });
                confirmModalDelete();
                getMeetings();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const confirmMeeting = async (id) => {
        try {
            const response = await axios.put('http://localhost:5000/meeting/' + id, {}, { withCredentials: true });
            if(response.status === 200) {
                toast('Meeting Approved!', {
                    duration: 1500,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    icon: '👏',
                });
                getMeetings();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const updateUserAdmin = async (id) => {
        try {
            console.log(document.getElementById('check-' + id).checked);
            const response = await axios.put('http://localhost:5000/user/admin', {
                id: id,
                isAdmin: document.getElementById('check-' + id).checked,
            }, { withCredentials: true });
            if(response.status === 200) {
                toast('User updated!', {
                    duration: 1500,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    icon: '👏',
                });
                getUsers();
            }
        } catch (err) {
            console.log(err);
        }
    };

    let newUsersAmount = 0;

    const openUsersModal = () => {
        document.getElementById('modalUsers').showModal();
        newUsersAmount++;
    };

    const closeModalUsers = () => {
        document.getElementById('modalUsers').close();
        newUsersAmount = 0;
    };

    const saveNewUsers = async (e) => {
        e.preventDefault();
        try {
            for(let i = 1; i <= document.getElementsByClassName('newUser').length; i++) {
                const newUser = await axios.post('http://localhost:5000/user/register/all', {
                    firstname: document.getElementById('firstname' + i).value,
                    lastname: document.getElementById('lastname' + i).value,
                    email: document.getElementById('email' + i).value,
                    password: document.getElementById('password' + i).value
                }, { withCredentials: true });
            }
            toast('New users created!', {
                duration: 1500,
                style: {
                    background: '#333',
                    color: '#fff',
                },
                icon: '👏',
            });
            getUsers();
            closeModalUsers();
        } catch (err) {
            console.log(err);
        }
    };

    const moreUsers = () => {
        const newUser = document.createElement('div');
        newUser.className = "newUser" + (newUsersAmount + 1);
        newUser.innerHTML = `
            <input type="text" id="firstname${newUsersAmount + 1}" placeholder="First name" />
            <input type="text" id="lastname${newUsersAmount + 1}" placeholder="Last name" />
            <input type="email" id="email${newUsersAmount + 1}" placeholder="Email" />
            <input type="password" id="password${newUsersAmount + 1}" placeholder="Password" />
        `;
        document.getElementById('userId' + newUsersAmount).insertAdjacentHTML('afterend', `
            <div class="newUser">
                <div class="grid">
                    <label for="firstname">Firstname
                        <input type="text" id="firstname${newUsersAmount + 1}" name="firstname" placeholder="Firstname" required />
                    </label>
                    <label for="lastname">Lastname
                        <input type="text" id="lastname${newUsersAmount + 1}" name="lastname" placeholder="Lastname" required />
                    </label>
                </div>
                <label for="email">Email</label>
                <input type="email" id="email${newUsersAmount + 1}" name="email" placeholder="Email" required />
                <label for="password">Password</label>
                <input type="password" id="password${newUsersAmount + 1}" name="password" placeholder="Password" required />
            </div>
        `);
        newUsersAmount++;
    };

    return (
        <div className="content-split">
            <div className="intro">
                <h1>Dashboard</h1>
                <p>Welcome, {user.firstname} {user.lastname}!</p>
                <p>You are logged in as <span className="highlighter">{user.isAdmin ? 'admin' : 'user'}</span>.</p>
                {user.isAdmin === true ? (
                    <button onClick={openUsersModal} class="secondary">New Users</button>
                ) : <></>}
                <button onClick={() => {
                    localStorage.removeItem('user');
                    localStorage.removeItem('ttl');
                    window.location.replace('http://localhost:3000/');
                }}>Log out</button>
                {user.isAdmin === true ? (
                    <div className="admin">
                        {allUsers.map((user) =>
                            <div key={user._id} className="user">
                                <h3 className="userName">{user.firstname} {user.lastname}</h3>
                                <small>admin:&nbsp;</small>
                                <input type="checkbox" id={"check-" + user._id} role="switch" checked={user.isAdmin} onChange={() => updateUserAdmin(user._id)} />
                            </div>
                        )}
                    </div>
                ) : <></> }
            </div>
            {user.isAdmin ? (
            <div className="meetings">
                <h1>Meetings</h1>
                <div className="meetingList">
                    {meetings.map((meeting) => 
                        meeting.confirmed ? 
                        <div key={meeting._id} className="meeting">
                            <h3>{meeting.title}</h3>
                            <p>{new Date(meeting.date).toDateString()} {meeting.time}</p>
                            <p>Status: <span className="confirmed">Approved</span></p>
                            <button onClick={() => checkDeleteMeeting(meeting._id)} className="secondary smallButton cancelHover">Cancel</button>
                        </div>
                        :
                        <div key={meeting._id} className="meeting">
                            <h3>{meeting.title}</h3>
                            <p>{new Date(meeting.date).toDateString()} {meeting.time}</p>
                            <p>Status: <span className="pending">Pending</span></p>
                            <div className="grid">
                                <button onClick={() => confirmMeeting(meeting._id)} className="secondary confirmHover">Approve</button>
                                <button onClick={() => deleteMeeting(meeting._id)} className="secondary denyHover">Deny</button>
                            </div>
                        </div>
                    )}
                </div>
                <button onClick={openModal} className="contrast">Create meeting</button>
            </div>
            ) : (
            <div className="meetings">
                <h1>Meetings</h1>
                <div className="meetingList">
                    {meetings.map((meeting) => 
                        meeting.confirmed ? 
                        <div key={meeting._id} className="meeting">
                            <h3>{meeting.title}</h3>
                            <p>{new Date(meeting.date).toDateString()} {meeting.time}</p>
                            <p>Status: <span className="confirmed">Approved</span></p>
                        </div>
                        :
                        <div key={meeting._id} className="meeting">
                            <h3>{meeting.title}</h3>
                            <p>{new Date(meeting.date).toDateString()} {meeting.time}</p>
                            <p>Status: <span className="pending">Pending</span></p>
                        </div>
                    )}
                </div>
                <button onClick={openModal} className="contrast">Create meeting</button>
            </div>
            )}
            <dialog id="modal">
              <article>
                <a className="close" onClick={closeModal}>
                </a>
                <h3>Create a meeting</h3>
                <p>
                  Send a meeting request.
                </p>
                <br />
                <form onSubmit={newMeeting}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Title" required />
                    <div className="grid">
                        <label htmlFor="date">Date
                            <input type="date" id="date" name="date" required />
                        </label>
                        <label htmlFor="time">Time
                            <input type="time" id="time" name="time" required />
                        </label>
                    </div>
                    <button type="button" onClick={closeModal} className="secondary">
                        Cancel
                    </button>
                    <button type="submit" onClick={confirmModal}>
                        Confirm
                    </button>
                </form>
              </article>
            </dialog>
            <dialog id="modalDelete">
              <article>
                <a className="close" onClick={closeModalDelete}>
                </a>
                <h3>Are you shure</h3>
                <button type="button" onClick={closeModalDelete} className="secondary">
                    Cancel
                </button>
                <button type="button" className="cancelColor" id="confirmDelete">
                    Delete
                </button>
              </article>
            </dialog>
            <dialog id="modalUsers">
              <article>
                <a className="close" onClick={closeModalUsers}>
                </a>
                <h3>Add new users</h3>
                <form onSubmit={saveNewUsers} id="newUsersForm">
                    <div className="newUser" id="userId1">
                        <div className="grid">
                            <label htmlFor="firstname">Firstname
                                <input type="text" id="firstname1" name="firstname" placeholder="Firstname" required />
                            </label>
                            <label htmlFor="lastname">Lastname
                                <input type="text" id="lastname1" name="lastname" placeholder="Lastname" required />
                            </label>
                        </div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email1" name="email" placeholder="Email" required />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password1" name="password" placeholder="Password" required />
                    </div>
                    <button type="button" onClick={moreUsers} className="secondary">
                        +1 user
                    </button>
                    <button type="button" onClick={closeModalUsers} className="secondary">
                        Cancel
                    </button>
                    <button type="submit">
                        Add
                    </button>
                </form>
              </article>
            </dialog>
            <Toaster />
        </div>
    );
};

export default Dashboard;