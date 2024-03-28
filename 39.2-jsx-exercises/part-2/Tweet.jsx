function Tweet({username, date, message, name}) {
    return (
    <div className="tweet">
        <p className="username">{username}</p>
        <p className="date">{date}</p>
        <p className="tweet-name">{name}</p>
        <p className="tweet-message">{message}</p>
    </div>
    )
}