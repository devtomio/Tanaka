const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const converter = require('color-convert');
const request = require('node-superfetch');

const colorRegex = /^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/i;

module.exports = class ColorCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'color',
			aliases: ['colour'],
			memberName: 'color',
			group: 'search',
			description: 'Gets info about a color hex code.',
			args: [
				{
					key: 'color',
					prompt: 'What is the color?',
					type: 'string',
					validate: (color) => colorRegex.test(color),
				},
			],
		});
	}

	async run(msg, { color }) {
		const code = color;

		const { body } = await request.get(`https://api.color.pizza/v1/${code.replace('#', '')}`);
		const embed = new MessageEmbed()
			.setTitle(body.colors[0].name)
			.setThumbnail(`https://serux.pro/rendercolour?hex=${code.replace('#', '')}`)
			.addField(
				'❯ RGB',
				`${converter.hex.rgb(code)[0]}, ${converter.hex.rgb(code)[1]}, ${
					converter.hex.rgb(code)[2]
				}`,
				true,
			)
			.addField(
				'❯ HSL',
				`${converter.hex.hsl(code)[0]}, ${converter.hex.hsl(code)[1]}, ${
					converter.hex.hsl(code)[2]
				}`,
				true,
			)
			.addField(
				'❯ HSV',
				`${converter.hex.hsv(code)[0]}, ${converter.hex.hsv(code)[1]}, ${
					converter.hex.hsv(code)[2]
				}`,
				true,
			)
			.addField(
				'❯ HWB',
				`${converter.hex.hwb(code)[0]}, ${converter.hex.hwb(code)[1]}, ${
					converter.hex.hwb(code)[2]
				}`,
				true,
			)
			.addField(
				'❯ CMYK',
				`${converter.hex.cmyk(code)[0]}, ${converter.hex.cmyk(code)[1]}, ${
					converter.hex.cmyk(code)[2]
				}, ${converter.hex.cmyk(code)[3]}`,
				true,
			)
			.addField('❯ Ansi 16', converter.hex.ansi16(code), true)
			.addField('❯ Ansi 256', converter.hex.ansi256(code), true)
			.addField('❯ Hex', `#${converter.rgb.hex(converter.hex.rgb(code))}`, true)
			.addField(
				'❯ LAB',
				`${converter.hex.lab(code)[0]}, ${converter.hex.lab(code)[1]}, ${
					converter.hex.lab(code)[2]
				}`,
				true,
			)
			.addField(
				'❯ HCG',
				`${converter.hex.hcg(code)[0]}, ${converter.hex.hcg(code)[1]}, ${
					converter.hex.hcg(code)[2]
				}`,
				true,
			)
			.addField(
				'❯ LCH',
				`${converter.hex.lch(code)[0]}, ${converter.hex.lch(code)[1]}, ${
					converter.hex.lch(code)[2]
				}`,
				true,
			)
			.addField(
				'❯ Apple',
				`${converter.hex.apple(code)[0]}, ${converter.hex.apple(code)[1]}, ${
					converter.hex.apple(code)[2]
				}`,
				true,
			)
			.addField('❯ Gray', converter.hex.gray(code)[0], true)
			.addField(
				'❯ XYZ',
				`${converter.hex.xyz(code)[0]}, ${converter.hex.xyz(code)[1]}, ${
					converter.hex.xyz(code)[2]
				}`,
				true,
			)
			.addField('❯ CSS Keyword', converter.hex.keyword(code), true)
			.setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
			.setColor(converter.rgb.hex(converter.hex.rgb(code)))
			.setImage(`https://api.alexflipnote.dev/color/image/gradient/${code.replace('#', '')}`)
			.setTimestamp();

		msg.embed(embed);
	}
};
