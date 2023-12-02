export default function Home() {
    return (
        <>
            <br />
            <div className="text-center h3 mt-2">Welcome to examms!</div>
            <br />
            <div style={{ fontSize: '12px', display: 'flex', justifyContent: 'center' }}>
                When you do login, server may take some time to respond the first request, please keep waiting. It will work!
            </div>
            <div style={{ fontSize: '14px', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'flex-row', gap: "100px" }}>
                <div>
                    <b> Demo Admin Login:</b>
                    <br />
                    username: balaji<br />
                    password: balaji<br />
                </div>
                <div>
                    <b> Demo Faculty Login:</b>
                    <br />
                    username: balaji<br />
                    password: balaji<br />
                </div>
                <div>
                    <b>Demo Student Login:</b>
                    <br />
                    username: 73772014108<br />
                    password: 13/12/2003<br />
                </div>
            </div >

        </>
    )
}