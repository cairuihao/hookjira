import React from 'react'
import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/auth-context'
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from '@emotion/styled'
import { Row, ButtonNoPadding } from 'components/lib'
import { Dropdown, Menu } from 'antd';
import Button from 'antd/es/button';

export default function AuthenticatedApp() {
    const {logout, user} = useAuth()

    return <Container>
        <PageHeader />
    </Container>
}

const PageHeader = () => {
    return (
        <Header between={true}>
            <HeaderLeft>
                <ButtonNoPadding type={'link'}>
                    <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
                </ButtonNoPadding>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    );
}

const User = () => {
    const { logout, user } = useAuth();
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key='logout'>
                        <Button type='link'>
                            登出
                        </Button>
                    </Menu.Item>
                </Menu>
            }
        >
            <Button type='link' onClick={e => e.preventDefault()}>
                Hi, {user?.name}
            </Button>
        </Dropdown>
    );
}

const Container = styled.div`
    display: flex;
    grid-template-columns: 6rem 1fr;
    height: 100vh;
`

const Header = styled(Row)`
    padding: 3.2rem;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
`

const HeaderLeft = styled(Row)``;
const HeaderRight= styled(Row)``;
const Main = styled.main`
    display: flex;
    overflow: hidden;
`