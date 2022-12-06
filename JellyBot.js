// Создать экземпляр клиента Discord
const Discord = require('discord.js');
const client = new Discord.Client({
	intents: [
		"Guilds", // for guild related things
		"GuildMembers", // for guild members related things
		//"GuildBans", // for manage guild bans
		//"GuildEmojisAndStickers", // for manage emojis and stickers
		//"GuildIntegrations", // for discord Integrations
		//"GuildWebhooks", // for discord webhooks
		//"GuildInvites", // for guild invite managing
		//"GuildVoiceStates", // for voice related things
		//"GuildPresences", // for user presence things
		"GuildMessages", // for guild messages things
		//"GuildMessageReactions", // for message reactions things
		//"GuildMessageTyping", // for message typing things
		//"DirectMessages", // for dm messages
		//"DirectMessageReactions", // for dm message reaction
		//"DirectMessageTyping", // for dm message typing
		"MessageContent", // enable if you need message content things
	],
});
console.log(`[7;33mdiscord.js v${Discord.version}[0;33m with [32m${client.guilds.cache.size+1}[33m guilds[0m`);
// Загрузить настройки
const { prefix, state, token } = require('./config.json');
// Отладка
//client.on('raw', console.log);

client.once('ready', () => {
	let dateNow = new Date().toLocaleString('ru', { hour12: false })
	console.log(`\n[36m> ${client.user.tag}:[0m бот запущен ${dateNow.replace(', ', ' в ')}\n`);
	client.user.setPresence({
		activities: [
      { name: "ТУР ПО ЕВРОПЕ", type: 3 }
    ],
    status: state[0],
	})
});

// Сообщение подключившемуся к каналу
client.on('guildMemberAdd', (member) => {
	// ищем канал с этим ID
	client.channels.fetch('ID_канала_куда_хотим_отвечать')
		//пишем привет пользователь
		.then(channel => channel.send(`Добро пожаловать на сервер, ${member}`));
	console.log(`[36m> ${member.id}:[0m Подключился к каналу [45m[0m`);
});

// Прочитать сообщение и совершить действие
client.on('messageCreate', async (message) => {
	// Запретить боту реагировать на сообщения ботов
	if (message.author.bot) {
		// Реагировать только на сообщения других ботов
		if (message.author.id === client.user.id) return;
		message.react('\ud83e\udd16'); // :robot:
		
	} else {
		if (message.content.startsWith(prefix)) {
			const command = message.content.slice(prefix.length).toLowerCase();

			switch(command) {
				case 'help': {
					const embed = new Discord.EmbedBuilder()
						.setColor(0x0FFFF) // Aqua
						.setThumbnail('https://i.imgur.com/r9jIvtY.gif')
						.setAuthor(
							{ name: 'GoodKid-разработчик', iconURL: 'https://i.imgur.com/yw9D1md.jpg', url: 'https://github.com/goodkid870' }
						)
						.setTitle('Команды:')
						.setURL('https://anidiots.guide/getting-started')
						.setDescription('Доступные команды для бота')
						.addFields(
							{ name: `${prefix}help`, value: 'Эту команду вы выполнили', inline: true },
							{ name: `${prefix}ping`, value: 'Отвечает на команду и добавляет реакцию', inline: true },
							{name: `${prefix}hi`, value: 'Приветствует пользователя, который написал эту команду', inline: true},
							{name: `${prefix}money`, value: 'Подбрасывает монетку', inline: true},
							{name: `${prefix}name`, value: 'Выводит случайное имя', inline: true},
							{name: `${prefix}cat`, value: 'Выводит случайную картинку с котиками', inline: true},
							{name: `${prefix}gachi`, value: 'Выводит картинку с настоящим мужиком', inline: true},
							{name: `${prefix}myid`, value: 'Выводит твой ID', inline: true},
							{name: `${prefix}delmess`, value: 'Убирает бардак в сообщениях на 100 пунктов :)', inline: true},

						)
						.setTimestamp()
						.setFooter(
							{ text: 'Разработчик скушал KitKat', iconURL: 'https://i.imgur.com/SnpYW5B.png' }
						);
					message.channel.send({ embeds: [embed] });

					message.react('\ud83d\udc41\u200d\ud83d\udde8'); // :eye_in_speech_bubble:
					console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
					break;
				}
				case 'ping': {
					message.reply('pong :wave:');
					message.react('\ud83d\udc41\u200d\ud83d\udde8'); // :eye_in_speech_bubble:
					console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
					break;
				}
				case 'money': {
					message.channel.send('Монета подбрасывается...')
					var random = Math.floor(Math.random() * 4) + 1; // Объявление переменной random - она вычисляет случайное число от 1 до 3
					if (random === 1) { // Если вычислено число 1, то выпадает орёл.
						message.channel.send(':full_moon: Орёл!')
						message.react('\ud83d\udc41\u200d\ud83d\udde8'); // :eye_in_speech_bubble:
						console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
						break;
					} else if (random === 2) { // Если вычислено число 2, то выпадает решка.
						message.channel.send(':new_moon: Решка!')
						message.react('\ud83d\udc41\u200d\ud83d\udde8'); // :eye_in_speech_bubble:
						console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
						break;
					} else if (random === 3) { // Если вычислено число 3, то монета падает ребром.
						message.channel.send(':last_quarter_moon: Монета упала ребром!')
						message.react('\ud83d\udc41\u200d\ud83d\udde8'); // :eye_in_speech_bubble:
						console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
						break;
					}
				}
				case 'hi':{
					if (message.author.username == message.author.username){
						message.channel.send(`Привет ${message.author}`)
						console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
						break;
					}
				}
				case "name":{
					let name = [ // Объявление массива name и занесение в него большого количества имён
						'Абрам', ' Аваз', ' Аввакум', ' Август', ' Августин',
						' Авдей', ' Авраам', ' Автандил', ' Агап', ' Агафон',
						' Аггей', ' Адам', ' Адис', ' Адольф', ' Адриан',
						' Азамат', ' Айдар', ' Айнур', ' Айрат', ' Аким',
						' Алан', ' Алей', ' Александр', ' Алексей', ' Али',
						' Альберт', ' Альфред', ' Амадей', ' Амадеус',
						' Амаяк', ' Амвросий', ' Ананий', ' Анастасий',
						' Анатолий', ' Анвар', ' Ангел', ' Андоим', ' Андрей',
						' Аникита', ' Антон', ' Арам', ' Арий', ' Аристарх',
						' Аркадий', ' Арман', ' Арно', ' Арнольд', ' Арон', ' Арсен',
						' Арсений', ' Арслан', ' Артем', ' Артемий', ' Артур', ' Архип', ' Аскар', ' Аскольд', ' Аслан', ' Афанасий', ' Ахмет', ' Ашот', ' Бальтазар', ' Бежен', ' Бенедикт', ' Берек', ' Бернард',
						' Бертран', ' Богдан', ' Болеслав', ' Борис', ' Бронислав',
						' Булат', ' Вадим', ' Валентин', ' Валерий', ' Вальтер',
						' Варфоломей', ' Василий', ' Вацлав', ' Велизар', ' Венедикт', ' Вениамин', ' Викентий', ' Виктор', ' Вилли', ' Вильгельм', ' Виссарион', ' Виталий', ' Витольд', ' Владимир', ' Владислав', ' Владлен', ' Володар', ' Вольдемар', ' Всеволод', ' Вячеслав', ' Гавриил', ' Галактион', ' Гарри', ' Гастон', ' Гаяс', ' Гевор', ' Геннадий', ' Генрих', ' Георгий', ' Геракл', ' Геральд', ' Герасим', ' Герман', ' Глеб', ' Гордей', ' Гордон', ' Горислав', ' Градимир', ' Григорий', ' Гурий', ' Густав', ' Давид', ' Дамир', ' Даниил', ' Даниэль', ' Данияр', ' Дарий', ' Дементий', ' Демид', ' Демосфен', ' Демьян', ' Денис', ' Джамал', ' Джордан', ' Дмитрий', ' Добрыня', ' Дональд', ' Донат', ' Дорофей', ' Евгений', ' Евграф', ' Евдоким', ' Евсевий', ' Евсей', ' Евстафий', ' Егор', ' Елеазар', ' Елисей', ' Емельян', ' Еремей', ' Ермолай', ' Ерофей', ' Ефим', ' Ефрем', ' Жан', ' Ждан', ' Жорж', ' Захар', ' Зиновий', ' Ибрагим', ' Иван', ' Игнатий', ' Игорь', ' Илларион', ' Ильдар', ' Ильнар', ' Ильнур', ' Илья', ' Ильяс', ' Иннокентий', ' Иоанн', ' Иосиф', ' Ипполит', ' Искандер', ' Ислам', ' Камиль', ' Карим', ' Карл', ' Кирилл', ' Клим', ' Кондрат', ' Константин', ' Корней', ' Кузьма', ' Лавр', ' Лаврентий', ' Лев', ' Леон', ' Леонид', ' Леонтий', ' Леопольд', ' Лука', ' Лукьян', ' Любим', ' Макар', ' Максим', ' Максимилиан', ' Марат', ' Марк', ' Марсель', ' Мартин', ' Матвей', ' Мирон', ' Мирослав', ' Митрофан', ' Михаил', ' Михей', ' Мишель', ' Мстислав', ' Мурат', ' Муслим', ' Назар', 'Абрам', ' Аваз', ' Аввакум', ' Август', ' Августин', ' Авдей', ' Авраам', ' Автандил', ' Агап', ' Агафон', ' Аггей', ' Адам', ' Адис', ' Адольф', ' Адриан', ' Азамат', ' Айдар', ' Айнур', ' Айрат', ' Аким', ' Алан', ' Алей', ' Александр',
						' Алексей', ' Али', ' Альберт', ' Альфред', ' Амадей', ' Амадеус', ' Амаяк', ' Амвросий', ' Ананий', ' Анастасий', ' Анатолий', ' Анвар', ' Ангел', ' Андоим', ' Андрей', ' Аникита', ' Антон', ' Арам', ' Арий', ' Аристарх', ' Аркадий', ' Арман', ' Арно', ' Арнольд', ' Арон', ' Арсен', ' Арсений', ' Арслан', ' Артем', ' Артемий', ' Артур', ' Архип', ' Аскар', ' Аскольд', ' Аслан', ' Афанасий', ' Ахмет', ' Ашот', ' Бальтазар', ' Бежен', ' Бенедикт', ' Берек', ' Бернард', ' Бертран', ' Богдан', ' Болеслав', ' Борис', ' Бронислав', ' Булат', ' Вадим', ' Валентин', ' Валерий', ' Вальтер', ' Варфоломей', ' Василий', ' Вацлав', ' Велизар', ' Венедикт', ' Вениамин', ' Викентий', ' Виктор', ' Вилли', ' Вильгельм', ' Виссарион', ' Виталий', ' Витольд', ' Владимир', ' Владислав', ' Владлен', ' Володар', ' Вольдемар', ' Всеволод', ' Вячеслав', ' Гавриил', ' Галактион', ' Гарри', ' Гастон',
						' Гаяс', ' Гевор', ' Геннадий', ' Генрих', ' Георгий', ' Геракл',
						' Геральд', ' Герасим', ' Герман', ' Глеб', ' Гордей', ' Гордон',
						' Горислав', ' Градимир', ' Григорий', ' Гурий', ' Густав',
						' Давид', ' Дамир', ' Даниил', ' Даниэль', ' Данияр',
						' Дарий', ' Дементий', ' Демид', ' Демосфен',
						' Демьян', ' Денис', ' Джамал', ' Джордан', ' Дмитрий', ' Добрыня',
						' Дональд', ' Донат', ' Дорофей', ' Евгений', ' Евграф', ' Евдоким', ' Евсевий', ' Евсей', ' Евстафий', ' Егор', ' Елеазар', ' Елисей', ' Емельян', ' Еремей', ' Ермолай', ' Ерофей', ' Ефим', ' Ефрем', ' Жан', ' Ждан', ' Жорж', ' Захар', ' Зиновий', ' Ибрагим', ' Иван', ' Игнатий', ' Игорь', ' Илларион', ' Ильдар', ' Ильнар', ' Ильнур', ' Илья', ' Ильяс', ' Иннокентий', ' Иоанн', ' Иосиф', ' Ипполит', ' Искандер', ' Ислам', ' Камиль', ' Карим', ' Карл', ' Кирилл', ' Клим', ' Кондрат', ' Константин', ' Корней', ' Кузьма', ' Лавр', ' Лаврентий', ' Лев', ' Леон', ' Леонид', ' Леонтий', ' Леопольд', ' Лука', ' Лукьян', ' Любим', ' Макар', ' Максим', ' Максимилиан', ' Марат', ' Марк', ' Марсель', ' Мартин', ' Матвей', ' Мирон', ' Мирослав', ' Митрофан', ' Михаил', ' Михей', ' Мишель', ' Мстислав', ' Мурат',
						' Муслим', ' Назар'
					];

					let RandElement = name[Math.floor(Math.random() * (name.length))]; // Выбор случайного элемента из массива
					message.channel.send(RandElement)
					message.react('\ud83d\udc41\u200d\ud83d\udde8');
					console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
					break;
				}
				case "gachi" :{
				async function gachiRandomGif() {
					const response = await fetch('https://g.tenor.com/v1/random?q=gachi&key=LIVDSRZULELA&media_filter=gif&limit=1');
					let data = await response.json();
					const embed = new Discord.EmbedBuilder()
						.setColor(0x0FFFF)
						.setTitle(`НАСТОЯЩИЕ МУЖЧИНЫ`)
						.setImage(data.results[0].media[0].gif.url) // Ставим МУЖИКА картинкой!
					message.channel.send({ embeds: [embed] });
					message.react('\ud83d\udc41\u200d\ud83d\udde8');
					console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
				}
					gachiRandomGif().catch(console.error);
					break
				}
				case "cat":{
					let res = fetch('https://some-random-api.ml/img/cat') //Извлекаем json от сайта
						.then(res => res.json()) // Просматриваем текст
						.then(json => {
							const embed = new Discord.EmbedBuilder()
								.setColor(0x0FFFF)
								.setTitle(`КОИТИКИ :)`)
								.setImage(json.link) // Ставим КОТИКА картинкой!
							message.channel.send({ embeds: [embed] }); // Отсылаем сообщение
							message.react('\ud83d\udc41\u200d\ud83d\udde8');
							console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
						});
					break
				}
				case 'myid':{
					if (message.author.username == message.author.username){
						message.channel.send(`${message.author} Твой ID: ${message.author.id}`)
						message.react('\ud83d\udc41\u200d\ud83d\udde8');
						console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
						break
					}
				}
				case "delmess":{
					if(!message.member.permissions.has('0x0000000000002000')){
						message.reply('У вас нет прав!')
					}
					else {
						message.channel.bulkDelete(100).then(() => {
							message.channel.send(`Deleted ${100} messages.`).then(msg => msg.delete(100));
						})
					}
					message.react('\ud83d\udc41\u200d\ud83d\udde8');
					console.log(`[36m> ${message.author.username}:[0m ответ на команду [45m${command}[0m`);
					break;
				}

				default: {
					message.react('\ud83c\udfb2'); // :game_die:
					console.log(`[36m> ${message.author.username}:[0m команда [41m${command}[0m не распознана`);
					break;
				}
			}
		} else {
			console.log(`[36m> ${message.author.username}:[0m отправил [90m"${message}"[0m`);
		}
	}
});

client.login(token).then(() => {client.user.setStatus(state[1]);}).catch(console.error);
