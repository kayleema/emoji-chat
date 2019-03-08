import React, {Component} from 'react';
import {Picker} from "emoji-mart";

export default class EmojiInputBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focused: false,
        }
    }

    render() {
        return (
            <div className="emojiInputBox">
                <div className={`inputBox ${this.state.focused ? 'inputBoxFocus':''}`} onClick={() => this.setState({focused: true})}>
                    {this.props.value}{this.state.focused ? '_':''}
                    {this.props.buttonText &&
                    <button className="submitPost" type="submit" onClick={(e) => {
                        e.stopPropagation();
                        this.setState({focused: false});
                        this.props.onButtonClick(e);
                    }}>
                        {this.props.buttonText}
                    </button>}
                    <button type="button" className="clearButton" onClick={() => this.props.onClear()}>❌</button>
                </div>
                {this.state.focused && (
                        <Picker
                            onSelect={this.props.onSelectEmoji.bind(this)}
                            style={{width: '100%'}}
                            title=''
                            emoji=''
                            native={true}
                            skinEmoji={"hand"}
                            i18n={{
                                search: '検索',
                                notfound: '見つけられませんでした',
                                skintext: '肌色を選ぶ',
                                categories: {
                                    search: '検索結果',
                                    recent: 'よく使う',
                                    people: '人',
                                    nature: '動物と自然',
                                    foods: '食べ物と飲み物',
                                    activity: '活動',
                                    places: '旅行と場所',
                                    objects: '物',
                                    symbols: '記号',
                                    flags: '旗',
                                    custom: 'Custom',
                                }
                            }}
                            emojiTooltip={false}
                            showPreview={true}
                            showSkinTones={true}
                        />
                )}
                {this.state.focused &&
                <div onClick={() => this.setState({focused: false})} className={"modalBg"}/>}
            </div>
        )
    }
}
