import React, {Component} from 'react';
import {Picker} from "emoji-mart";

export default class EmojiInputBox extends Component {
    render() {
        return (
            <div className="emojiInputBox">
                <input
                    type="text"
                    value={this.props.value}
                    onChange={() => {}}
                />
                <Picker
                    onSelect={this.props.onSelectEmoji.bind(this)}
                    style={{width: '100%'}}
                    title='絵文字を選んでください'
                    emoji='smile_cat'
                    native={true}
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
                />
            </div>
        )
    }
}
