require 'rails_helper'

RSpec.describe TokenDecorator, type: :decorator do

  let(:token)         { Token.create! }

  subject(:decorator) { token.decorate }

  its(:display_name)  { is_expected.to include "#{token.id}" }

end
