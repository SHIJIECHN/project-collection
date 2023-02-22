import {Component} from 'react'
/**
 * 列表高阶组件
 * @param {*} WrapperComponent 被包裹的组件
 * @param {*} fetchListData 获取数据接口
 * @returns 新的组件
 */
function listHoc(WrapperComponent, fetchListData) {
    // 返回新的组件
    return class extends Component {
        state = {
            listData: [] // 存放请求的数据
        }

        async componentDidMount() {
            // 获取数据
            const result = await fetchListData(this.props.field); // 传入field区别请求老师还是学生
            this.setState({
                listData: result.data // 将请求到的数据放入listData中
            })
        }

        // 删除学生
        removeStudent(id) {
            this.setState({
                listData: this.state.listData.filter(item => item.id !== id)
            })
        }

        // 喜欢的老师
        likeTeacher(id) {
            this.setState({
                listData: this.state.listData.map(item => {
                    if (item.id === id) {
                        item.like += 1
                    }
                    return item;
                })
            })
        }

        render() {
            return (
                <>
                    {
                        // 根据field判断返回哪个组件
                        this.props.field === 'student'
                            ?
                            <WrapperComponent
                                data={this.state.listData}
                                removeStudent={this.removeStudent.bind(this)}
                            />
                            :
                            <WrapperComponent
                                data={this.state.listData}
                                likeTeacher={this.likeTeacher.bind(this)}
                            />
                    }
                </>

            )
        }
    }
}

export default listHoc;