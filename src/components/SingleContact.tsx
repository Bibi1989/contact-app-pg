import React from 'react'

const SingleContact: React.FC<{contact: any, show: boolean}> = ({contact, show}) => {
    return (
        <>
        <div style={{display: `flex`, flexDirection: `column`, justifyContent: `center`, paddingRight: `20%`}}>
            {show && <div style={style}>
                <p style={{fontSize: `6em`, marginTop: `-20px`}}>{contact === undefined || contact.first_name[0]}</p>
            </div>}
            <hr />

            <div style={{padding: `30px 0`}}>
                <h1 style={{fontSize: `3.5em`}}>{contact === undefined || contact.first_name} {contact === undefined || contact.last_name}</h1>
            </div>

            <div role="list" className="ui list">
                <div role="listitem" className="item">
                    <i aria-hidden="true" className="phone volume icon" style={{fontSize: `2.5em`}}></i>
                    <div className="content" style={{fontSize: `1.5em`}}>{contact === undefined || contact.phone}</div>
                </div>
            </div>

            <div role="list" className="ui list">
                <div role="listitem" className="item">
                    <i aria-hidden="true" className="envelope outline icon" style={{fontSize: `2.5em`}}></i>
                    <div className="content" style={{fontSize: `1.5em`}}>{contact === undefined || contact.email}</div>
                </div>
            </div>

            <div role="list" className="ui list">
                <div role="listitem" className="item">
                    <i aria-hidden="true" className="folder open icon" style={{fontSize: `2.5em`}}></i>
                    <div className="content" style={{fontSize: `1.5em`}}>{contact === undefined || contact.company}</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SingleContact

const style = {
    width: `150px`,
    height: `150px`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    borderRadius: `50%`,
    border: `1px solid teal`,
    marginRight: `25px`,
    marginBottom: `5%`,
}

