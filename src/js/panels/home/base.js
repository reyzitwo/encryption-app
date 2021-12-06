import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout} from '../../store/router/actions';
import {
    UTF8ToBin, 
    binToUTF8, 
    alphabetLetters, 
    encryptCaesarCipher, 
    decryptCaesarCipher,
    encryptMorse,
    decryptMorse
} from '../../../functions';

import {
    Panel, 
    Group, 
    PanelHeader,
    FormItem,
    Select,
    Textarea,
    Div,
    Button
} from '@vkontakte/vkui'
import { 
    Icon28ArrowUpOutline,
    Icon28ArrowDownOutline
} from '@vkontakte/icons'

class HomePanelBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            method: '',
            isEncrypt: true,
            alphabet: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const { name, value } = e.currentTarget;
        this.setState({ [name]: value })

        if (name === 'language') {
            this.setState({ alphabet: value === 'rus' ? true : false })
        }
    }

    async actionEncryption() {
        const {method, isEncrypt, firstInput, shift, alphabet} = this.state

        if (method === '1') {
            if (isEncrypt) {
                this.setState({ secondInput: UTF8ToBin(firstInput) })
            } else {
                this.setState({ secondInput: binToUTF8(firstInput) })
            }
        } else if (method === '2') {
            window.alphabet = alphabet ? 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            if (isEncrypt) {
                this.setState({ secondInput: encryptCaesarCipher(firstInput, shift) })
            } else {
                this.setState({ secondInput: decryptCaesarCipher(firstInput, shift) })
            }
        } else {
            if (isEncrypt) {
                this.setState({ secondInput: encryptMorse(firstInput, alphabet) })
            } else {
                this.setState({ secondInput: decryptMorse(firstInput, alphabet) })
            }
        }
    }

    render() {
        const {id} = this.props;
        const {method, isEncrypt, firstInput, secondInput, language, alphabet} = this.state;

        return (
            <Panel id={id}>
                <PanelHeader separator={false}>Главная</PanelHeader>
                <Group>
                    <FormItem top='Способ шифрования'>
                        <Select
                            name='method'
                            placeholder='Не выбран' 
                            options={[
                                {value: '0', label: 'Азбука Морзе'},
                                {value: '1', label: 'Двоичное кодирование'},
                                {value: '2', label: 'Шифр Цезаря (обратный)'}
                            ]}
                            onChange={this.onChange}
                        />
                    </FormItem>

                    {(method === '0' || method === '2') &&
                        <FormItem top='Изначальный язык'>
                            <Select
                                name='language'
                                placeholder='Не выбран' 
                                options={[
                                    {value: 'rus', label: 'Русский язык'},
                                    {value: 'eng', label: 'Английский язык'},
                                ]}
                                onChange={this.onChange}
                            />
                        </FormItem>
                    }

                    {method === '2' &&
                        <FormItem top='Сдвиг алфавита'>
                            <Select
                                name='shift'
                                placeholder='Не выбран'
                                options={alphabetLetters(alphabet ? 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
                                disabled={language === undefined}
                                onChange={this.onChange}
                            >
                            </Select>
                        </FormItem>
                    }

                    {method !== '' && 
                        <>
                            <Div>
                                <Textarea
                                    placeholder={isEncrypt ? 'Введите текст, который требуется зашифровать' : 'Введите текст, который требуется расшифровать'}
                                    name='firstInput'
                                    value={firstInput}
                                    onChange={this.onChange}
                                />
                            </Div>

                            <Button 
                                before={
                                    <div className='arrows'> 
                                        <Icon28ArrowUpOutline className='arrowColor'/> 
                                        <Icon28ArrowDownOutline className='arrowColor'/>   
                                    </div>
                                }
                                mode='tertiary'
                                onClick={() => {
                                    this.setState({ 
                                        isEncrypt: !isEncrypt,
                                        firstInput: '',
                                        secondInput: ''
                                    })
                                }}
                                className='div-center'
                            />

                            <Div>
                                <Textarea
                                    placeholder={isEncrypt ? 'Здесь будет зашифрованный текст' : 'Здесь будет расшифрованный текст'}
                                    value={secondInput}
                                />
                            </Div>

                            <Div>
                                <Button 
                                    size='l'
                                    stretched
                                    disabled={
                                        firstInput === undefined || 
                                        firstInput === '' ||
                                        (method === '0' || method === '2' ? language === undefined : false)
                                    }
                                    onClick={() => this.actionEncryption()}
                                >
                                    {isEncrypt ? 'Зашифровать!' : 'Расшифровать!'}
                                </Button>
                            </Div>
                        </>
                    }
                </Group>
            </Panel>
        );
    }

}

const mapDispatchToProps = {
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);
