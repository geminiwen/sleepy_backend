import { ipcRenderer } from 'electron'
import { 
    message,
    Layout, 
    Menu, 
    Icon 
} from 'antd'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import NetworkPannel from './network_pannel'
import AboutPannel from './about_pannel'
import About from './about_pannel';
import "./settings.css"

const {
    Header, Content, Footer, Sider,
  } = Layout;

class Setting extends React.Component {
    state = {
        host: undefined,
        port: undefined,
        pannel: 1
    }

    componentDidMount() {
        ipcRenderer.send('renderer-loaded') 
        ipcRenderer.on('load-settings', (event, settings) => {
            const {host, port} = JSON.parse(settings) 
            this.setState({host, port})
        })
    }

    handleSaveSettings = (host, port) => {
        ipcRenderer.send('save-settings', 
            JSON.stringify({ host, port: parseInt(port)
        }))
        message.success("保存成功")
    }

    handlePannelChange = ({item, key}) => {
        this.setState({pannel: key})
    }

    render() {
        let {host, port, pannel} = this.state

        let pannelDOM
        if (pannel == 1) {
            pannelDOM = (<NetworkPannel host={host} port={port} onSave={this.handleSaveSettings} />)
        } else {
            pannelDOM = (<About />)
        }


        return (
        <Layout>
            <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', paddingTop: "30px", left: 0}}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onSelect={this.handlePannelChange}>
                <Menu.Item key="1">
                    <Icon type="compass" />
                    <span className="nav-text">通用</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="read" />
                    <span className="nav-text">关于</span>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200, height: '100vh' }}>
            <Content style={{ margin: '16px', overflow: 'initial', paddingTop: "20px" }} >
                {pannelDOM} 
            </Content>
            </Layout>
        </Layout>
        )
    }
}

ReactDOM.render(<Setting />, document.getElementById('root'))