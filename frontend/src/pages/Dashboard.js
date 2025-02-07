import React from "react";

const Dashboard = () => {
    return (
        <div style={styles.container}>
            <h1>Welcome to the Dashboard</h1>
            <p>This is a Password Reset system.</p>
        </div>
    );
};

const styles = {
    container: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" },
};

export default Dashboard;
