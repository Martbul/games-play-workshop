import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(){
        super()

        this.state = {
            hasError: false
        }
    }
    
    static getDerivedStateFromError(err){
        console.log('1');
        return {
            hasError:true
        }
    }


    componentDidCatch(error,errorInfo){
        console.log('2');
    }

    

    render() {
        if(this.state.hasError){
            return   <h1>404</h1>
        }
        return    this.props.children
    }
}