import React, {useEffect, useState} from 'react';

import {List} from '@mui/material';

import {Block, Text} from '../../ui-styled-components/common';
import {BasicButton} from '../BasicButton/BasicButton';
import {DrawerList} from '../DrawerComponent/Drawer-list';
import {DrawerComponent} from '../DrawerComponent/DrawerComponent';
import {LogoutSVG} from '../Svg/LogoutSvg';
import {MenuBaraSvg} from '../Svg/MenuBaraSvg';
import {BasicSelect} from "../BasicSelect/BasicSelect";

type NavBarPropsType = {
    selectOptions?: SelectOptionsType[];
    userName?: string;
    onSelect: (value: string | number) => void;
    currentCourse: string | number;
    logout?: () => void;
    linkComponent?: JSX.Element;
};

type SelectOptionsType = {
    value: number
    title: string
}
/**
 * JSX Component ( NavBar )
 * Всегда отрисовывается сверху сайта
 * Не примает никакиз пропсов
 */
export const NavBar = (props: NavBarPropsType) => {
    const name = props.userName || 'Елизавета Спивак';
    const selectOptions = props.selectOptions || [{value: 1, title: 'Front-end'}, {value: 3, title: 'Back-End'}];
    const [currentCourse, setCurrentCourse] = useState(
        props.currentCourse ? props.currentCourse : +selectOptions[0].value
    );

    const localstorageKey = 'course-id';

    const onSelectHandler = (value: string) => {
        props.onSelect && props.onSelect(+value);
        setCurrentCourse(+value);
        localStorage.setItem(localstorageKey, value);
    };

    useEffect(() => {
        const localCurrentCourse = localStorage.getItem(localstorageKey);

        if (localCurrentCourse) {
            console.log(localCurrentCourse, 'localCurrentCourse')
            setCurrentCourse(+localCurrentCourse);
        }
    }, []);

    useEffect(() => {
        setCurrentCourse(props.currentCourse)
    }, [props.currentCourse]);

    const [isOpenLeftDrawer, setIsOpenLeftDrawer] = useState(false);

    const toggleDrawer =
        (isDrawer: boolean, isRight = false) =>
            (event: any) => {
                if (
                    event.type === 'keydown' &&
                    (event.key === 'Tab' || event.key === 'Shift')
                ) {
                    return;
                }
                !isRight && setIsOpenLeftDrawer(isDrawer);
            };

    const listLeft = (LinksComponent: JSX.Element) => {
        return (
            <DrawerList toggleDrawer={toggleDrawer} isRight={false}>
                <List>{LinksComponent}</List>
            </DrawerList>
        );
    };

    return (
        <Block
            name={'NavBarContainer'}
            minHeight={'60px'}
            background={'#FCFCFC'}
            margin={'0 0 5px 0'}
            boxShadow={
                '0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)'
            }
        >
            <Block
                name={'ContentContainer'}
                width={'90vw'}
                justifyContent={'space-between'}
            >
                <Block
                    name={'LeftHalf'}
                    justifyContent={'flex-start'}
                    margin={'10px 10px 10px 0'}
                    onClick={() => setIsOpenLeftDrawer(true)}
                >
                    <MenuBaraSvg/>
                </Block>
                <DrawerComponent
                    isOpenDrawer={isOpenLeftDrawer}
                    toggleDrawer={toggleDrawer}
                    list={props.linkComponent ? listLeft(props.linkComponent) : <></>}
                    anchor="left"
                />
                <Block
                    name={'RightHalf'}
                    justifyContent={'flex-start'}
                    width={'fit-content'}
                >
                    <Block
                        name={'SelectItem'}
                        width={'250px'}
                        justifyContent={'flex-start'}
                        margin={'10px 40px 10px 0'}
                    >
                        <BasicSelect
                            addNullableValue={false}
                            value={currentCourse}
                            defaultValue={currentCourse}
                            options={selectOptions}
                            onSelect={onSelectHandler}
                        />
                    </Block>
                    <Block name={'NameItem'} margin={'10px 30px 10px 0'}>
                        <Text fontSize={'16px'}>{name}</Text>
                    </Block>
                    <BasicButton
                        mode={'normal'}
                        icon={<LogoutSVG/>}
                        text={'Sign out'}
                        onClick={() => props.logout && props.logout()}
                    />
                </Block>
            </Block>
        </Block>
    );
};
