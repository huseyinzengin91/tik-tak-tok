import React from 'react'
import heart from './../assets/heart.svg'

class HealtBar extends React.Component{
    render(){
        let hearts = [];

        for (let index = 0; index < this.props.heartCount; index++) {
            hearts.push(<img key={index} alt="" src={heart} width="24"/>)
        }

        return <div style={{display:"flex-inline", alignItems:"flex-end"}}>
            {hearts}
        </div>
    }
}

export default HealtBar;