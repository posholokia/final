import React from "react";
import { Route, Routes } from 'react-router-dom';

import Layout from "./Layout";
import Main from "./Main";
import LoginForm from "./LoginForm";
import Logout from "./Logout";
import Details from "./Details";
import PersonalAccount from "./PersonalAccount";
import Protected from "./Protected";
import AddServiceForm from "./AddService";
import AddClaimsForm from "./AddClaims";
import UpdateServiceForm from "./UpdateServise";
import UpdateClaimsForm from "./UpdateClaims";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Main />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/details" element={<Details />} />
                    <Route path="/add-service" element=
                        {<Protected>
                            <AddServiceForm />
                        </Protected>} />
                    <Route path="/add-claims" element=
                        {<Protected>
                            <AddClaimsForm />
                        </Protected>} />
                    <Route path="/update-service" element=
                        {<Protected>
                            <UpdateServiceForm />
                        </Protected>} />
                    <Route path="/update-claims" element=
                        {<Protected>
                            <UpdateClaimsForm />
                        </Protected>} />
                    <Route path="/personalaccount" element=
                        {<Protected>
                            <PersonalAccount />
                        </Protected>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
