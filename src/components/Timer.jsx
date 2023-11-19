import { useEffect } from "react";

export default function Timer(props) {
    const { endtime, remTime, setRemTime } = props;

    useEffect(() => {
        const interval = setInterval(() => {
            const ms = new Date(endtime) - new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000))
            const d = ms / (24 * 60 * 60 * 1000);
            const h = (d - parseInt(d)) * 24;
            const m = (h - parseInt(h)) * 60;
            const s = (m - parseInt(m)) * 60;
            setRemTime(
                ms <= 100 ? '0 : 0 : 0 : 0' : (d + '').split('.')[0] + " : " + (h + '').split('.')[0] + " : " + (m + '').split(".")[0] + " : " + s.toFixed()
            )
        }, 1000);
        return () => clearInterval(interval);
    }, [endtime])

    return (
        <div className="text-end h5" style={{
            color: 'red'
        }}>
            <b>{remTime}</b>
        </div>
    );
}