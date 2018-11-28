import React, {Component} from 'react';
import sidebarData from './data.json';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'antd';
const { SubMenu } = Menu;

class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'overview',
      theme: 'dark'
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      current: e.key
    });
  }

  render() {
    return (
      <div>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 240 }}
          defaultOpenKeys={['overview', 'sub-res', 'sub-other']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          {
            sidebarData.map((item: any) => {
              if (item.children instanceof Array) {
                return (
                  <SubMenu key={item.key}
                       title={<span><Icon type={item.icon} /><span>{item.label}</span></span>}>
                    {
                      item.children.map((subItem: any) => (
                        <Menu.Item key={subItem.key}>
                          <Link to={subItem.url}>{subItem.label}</Link>
                        </Menu.Item>
                      ))
                    }
                  </SubMenu>
                )
              } else {
                return (
                  <Menu.Item key={item.key}>
                    <Link to={item.url}>
                      <Icon type={item.icon} />{item.label}
                    </Link>
                  </Menu.Item>
                )
              }
            })
          }
        </Menu>
      </div>
    );
  }
}

export default SidebarComponent;