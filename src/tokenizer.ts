import * as nearley from 'nearley';
import { REGEX_ICS_LINE_BREAK } from '~/constant';
import { filterEmptyLine, unfoldLine } from '~/helper';
import { TokenizerOptions } from '~/interfaces/options';
import { Token } from '~/interfaces/token';
import { Iterable } from '~/iterable';
import * as grammar from '~/nearley/grammar';

export class Tokenizer {
	// default options
	private options: TokenizerOptions = {
		quiet: false,
	};

	public constructor(opts?: TokenizerOptions) {
		this.options.quiet = !!opts?.quiet;
	}

	// split ics file content into tokens
	public tokenize(ics: string): Iterable<Token> {
		return new Iterable(
			filterEmptyLine(unfoldLine(ics).split(REGEX_ICS_LINE_BREAK))
				.map((line) => {
					const results = new nearley.Parser(nearley.Grammar.fromCompiled(grammar)).feed(line)
						.results as Token[];
					if (results.length !== 1 && !this.options.quiet) {
						console.warn(`Unexpected parsing result length: ${results.length}`, results);
					}
					return results;
				})
				.reduce((results, tokens) => [...results, ...tokens], [] as Token[]),
		);
	}
}
