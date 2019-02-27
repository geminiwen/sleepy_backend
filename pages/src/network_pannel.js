import React, { Component } from 'react'
import { Form, Input, Icon, Button } from 'antd'
import PropTypes from 'prop-types'

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };


class Network extends Component {

    hanldeSubmit() {
        const { form, onSave } = this.props
        form.validateFields((err, values) => {
            const {host, port} = values
            onSave && onSave(host, port)
        })
    }


    render() {
        let {host, port} = this.props
        const { getFieldDecorator } = this.props.form;

        return (
            <Form style={{backgroundColor: "#fff", padding: 24}}
                  onSubmit={this.handleSubmit}>
                <h2 style={{marginBottom: "25px"}}>服务设置</h2>
                <Form.Item {...formItemLayout} >{
                    getFieldDecorator('host', {
                        initialValue: host,
                        rules: [{
                            required: true, message: '请输入绑定的 IP 地址',
                        }]
                    })(
                        <Input prefix={<Icon type="laptop" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="绑定 IP" />    
                    )
                }
                </Form.Item>

                <Form.Item {...formItemLayout} >{
                    getFieldDecorator('port', {
                        initialValue: port,
                        rules: [{
                            required: true, message: '请输入端口号',
                        }]
                    })(
                        <Input prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                            placeholder="端口号" />
                    )
                }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => {this.hanldeSubmit()}}>保存设置</Button>
                </Form.Item>
            </Form>
        )
    }
}

Network.propTypes = {
    host: PropTypes.string,
    port: PropTypes.number,
    onSave: PropTypes.func
}

export default Form.create()(Network)