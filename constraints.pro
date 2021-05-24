% Ensure we are using the Apache 2.0 License
gen_enforced_field(WorkspaceCwd, 'license', 'Apache-2.0').

% Ensure we have a homepage
gen_enforced_field(WorkspaceCwd, 'homepage', Homepage) :-
	atom_concat('https://tanaka-bot.me', WorkspaceCwd, Homepage).
